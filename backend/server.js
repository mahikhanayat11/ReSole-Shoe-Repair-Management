const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");

const app = express();

const PORT = 5000;


// ======================================================
// MIDDLEWARE
// ======================================================

app.use(cors());
app.use(express.json());


// ======================================================
// MYSQL CONFIG
// ======================================================
// Tumhare MySQL ka port 3307 hai.

const DB_CONFIG = {
    host: "127.0.0.1",
    port: 3307,
    user: "root",
    password: "Resole@123"
};

let pool;


// ======================================================
// DATABASE INITIALIZATION
// ======================================================

async function initializeDatabase() {

    try {

        // MySQL server se connection
        const connection =
            await mysql.createConnection({
                host: DB_CONFIG.host,
                port: DB_CONFIG.port,
                user: DB_CONFIG.user,
                password: DB_CONFIG.password
            });


        // Database create
        await connection.query(
            "CREATE DATABASE IF NOT EXISTS resole"
        );


        await connection.end();


        // Database pool
        pool = mysql.createPool({

            host: DB_CONFIG.host,

            port: DB_CONFIG.port,

            user: DB_CONFIG.user,

            password: DB_CONFIG.password,

            database: "resole",

            waitForConnections: true,

            connectionLimit: 10,

            queueLimit: 0

        });


        // Test connection
        const testConnection =
            await pool.getConnection();

        console.log(
            "MySQL connected successfully!"
        );

        testConnection.release();


        // ==================================================
        // ADMINS TABLE
        // ==================================================

        await pool.query(`

            CREATE TABLE IF NOT EXISTS admins (

                admin_id INT AUTO_INCREMENT PRIMARY KEY,

                name VARCHAR(100) NOT NULL,

                phone VARCHAR(20) NOT NULL UNIQUE,

                password VARCHAR(255) NOT NULL,

                created_at TIMESTAMP
                    DEFAULT CURRENT_TIMESTAMP

            )

        `);


        // ==================================================
        // CUSTOMERS TABLE
        // ==================================================

        await pool.query(`

            CREATE TABLE IF NOT EXISTS customers (

                customer_id INT AUTO_INCREMENT PRIMARY KEY,

                name VARCHAR(100) NOT NULL,

                phone VARCHAR(20) NOT NULL,

                created_at TIMESTAMP
                    DEFAULT CURRENT_TIMESTAMP

            )

        `);


        // Older installs may still have a UNIQUE constraint on
        // customers.phone from an earlier version — that blocks
        // saving two different customers who share a phone number,
        // so drop it if present.

        const [customerPhoneIndexes] =
            await pool.query(
                `
                SELECT INDEX_NAME
                FROM INFORMATION_SCHEMA.STATISTICS
                WHERE TABLE_SCHEMA = DATABASE()
                    AND TABLE_NAME = 'customers'
                    AND COLUMN_NAME = 'phone'
                    AND NON_UNIQUE = 0
                `
            );

        for (const row of customerPhoneIndexes) {

            await pool.query(
                `ALTER TABLE customers DROP INDEX \`${row.INDEX_NAME}\``
            );

            console.log(
                `Customers table: dropped unique constraint "${row.INDEX_NAME}" on phone.`
            );

        }


        // ==================================================
        // ORDERS TABLE
        // ==================================================

        await pool.query(`

            CREATE TABLE IF NOT EXISTS orders (

                order_id INT AUTO_INCREMENT PRIMARY KEY,

                customer_id INT,

                customer_name VARCHAR(100) NOT NULL,

                phone VARCHAR(20) NOT NULL,

                repair_type VARCHAR(100) NOT NULL,

                delivery_date DATE NOT NULL,

                repair_cost DECIMAL(10,2)
                    NOT NULL DEFAULT 0,

                status VARCHAR(30)
                    NOT NULL DEFAULT 'Received',

                created_at TIMESTAMP
                    DEFAULT CURRENT_TIMESTAMP,

                FOREIGN KEY (customer_id)
                    REFERENCES customers(customer_id)

                    ON DELETE SET NULL

            )

        `);


        // ==================================================
        // ORDERS TABLE SELF-HEAL
        // (fixes an older/leftover "orders" table that may
        // already exist without the columns this app needs,
        // which is what makes "new order" / "update status"
        // silently fail once a table already exists)
        // ==================================================

        const requiredOrderColumns = {
            customer_id: "INT",
            customer_name: "VARCHAR(100) NOT NULL DEFAULT ''",
            phone: "VARCHAR(20) NOT NULL DEFAULT ''",
            repair_type: "VARCHAR(100) NOT NULL DEFAULT ''",
            delivery_date: "DATE NULL",
            repair_cost: "DECIMAL(10,2) NOT NULL DEFAULT 0",
            status: "VARCHAR(30) NOT NULL DEFAULT 'Received'"
        };

        const [existingOrderColumns] =
            await pool.query(
                `
                SELECT COLUMN_NAME
                FROM INFORMATION_SCHEMA.COLUMNS
                WHERE TABLE_SCHEMA = DATABASE()
                    AND TABLE_NAME = 'orders'
                `
            );

        const existingOrderColumnNames =
            existingOrderColumns.map(
                row => row.COLUMN_NAME
            );

        for (const columnName in requiredOrderColumns) {

            if (!existingOrderColumnNames.includes(columnName)) {

                await pool.query(
                    `ALTER TABLE orders ADD COLUMN ${columnName} ${requiredOrderColumns[columnName]}`
                );

                console.log(
                    `Orders table: added missing column "${columnName}".`
                );

            }

        }


        // ==================================================
        // DEFAULT ADMIN
        // ==================================================

        const [adminRows] =
            await pool.query(
                `
                SELECT admin_id
                FROM admins
                WHERE phone = ?
                LIMIT 1
                `,
                ["7838481754"]
            );


        if (adminRows.length === 0) {

            const hashedPassword =
                await bcrypt.hash(
                    "admin123",
                    10
                );


            await pool.query(
                `
                INSERT INTO admins
                (
                    name,
                    phone,
                    password
                )

                VALUES (?, ?, ?)
                `,
                [
                    "Admin",
                    "7838481754",
                    hashedPassword
                ]
            );


            console.log(
                "Default Admin account created."
            );

        } else {

            console.log(
                "Admin account already exists."
            );

        }

    } catch (error) {

        console.error(
            "DATABASE ERROR:",
            error.message
        );

        process.exit(1);
    }
}


// ======================================================
// ROOT TEST
// ======================================================

app.get("/", (req, res) => {

    res.json({
        message: "ReSole Backend is running!"
    });

});


// ======================================================
// ADMIN LOGIN
// ======================================================

app.post(
    "/api/admin/login",
    async (req, res) => {

        try {

            const {
                phone,
                password
            } = req.body;


            if (!phone || !password) {

                return res.status(400).json({

                    error:
                        "Phone number and password are required."

                });

            }


            const [rows] =
                await pool.query(
                    `
                    SELECT
                        admin_id,
                        name,
                        phone,
                        password

                    FROM admins

                    WHERE phone = ?

                    LIMIT 1
                    `,
                    [phone]
                );


            if (rows.length === 0) {

                return res.status(401).json({

                    error:
                        "Invalid phone number or password."

                });

            }


            const admin =
                rows[0];


            const passwordMatch =
                await bcrypt.compare(
                    password,
                    admin.password
                );


            if (!passwordMatch) {

                return res.status(401).json({

                    error:
                        "Invalid phone number or password."

                });

            }


            res.json({

                message:
                    "Login successful",

                admin: {

                    id:
                        admin.admin_id,

                    name:
                        admin.name,

                    phone:
                        admin.phone

                }

            });


        } catch (error) {

            console.error(
                "LOGIN ERROR:",
                error
            );


            res.status(500).json({

                error:
                    "Login failed."

            });

        }

    }
);


// ======================================================
// DASHBOARD
// ======================================================

app.get(
    "/api/dashboard",
    async (req, res) => {

        try {

            const [today] =
                await pool.query(`

                    SELECT COUNT(*) AS total

                    FROM orders

                    WHERE DATE(created_at)
                        = CURDATE()

                `);


            const [pending] =
                await pool.query(`

                    SELECT COUNT(*) AS total

                    FROM orders

                    WHERE status IN
                    ('Received', 'Repairing')

                `);


            const [completed] =
                await pool.query(`

                    SELECT COUNT(*) AS total

                    FROM orders

                    WHERE status = 'Delivered'

                `);


            const [ready] =
                await pool.query(`

                    SELECT COUNT(*) AS total

                    FROM orders

                    WHERE status = 'Ready'

                `);


            const [revenue] =
                await pool.query(`

                    SELECT

                        COALESCE(
                            SUM(repair_cost),
                            0
                        ) AS total

                    FROM orders

                    WHERE status = 'Delivered'

                `);


            res.json({

                todayOrders:
                    today[0].total,

                pendingRepairs:
                    pending[0].total,

                completed:
                    completed[0].total,

                readyPickup:
                    ready[0].total,

                revenue:
                    revenue[0].total

            });


        } catch (error) {

            console.error(
                "DASHBOARD ERROR:",
                error
            );


            res.status(500).json({

                error:
                    "Failed to load dashboard."

            });

        }

    }
);


// ======================================================
// GET ALL ORDERS
// ======================================================

app.get(
    "/api/orders",
    async (req, res) => {

        try {

            const [orders] =
                await pool.query(`

                    SELECT *

                    FROM orders

                    ORDER BY order_id DESC

                `);


            res.json(orders);


        } catch (error) {

            console.error(
                "ORDERS ERROR:",
                error
            );


            res.status(500).json({

                error:
                    "Failed to load orders."

            });

        }

    }
);


// ======================================================
// CREATE ORDER
// ======================================================

app.post(
    "/api/orders",
    async (req, res) => {

        try {

            const {
                customerName,
                customerPhone,
                repairType,
                deliveryDate,
                repairCost
            } = req.body;


            if (
                !customerName ||
                !customerPhone ||
                !repairType ||
                !deliveryDate ||
                repairCost === undefined
            ) {

                return res.status(400).json({

                    error:
                        "All fields are required."

                });

            }


            // ----------------------------------------------
            // Find customer
            // (match phone AND name — same phone with a
            // different name is treated as a different
            // customer, so both show up separately)
            // ----------------------------------------------

            const [existingCustomer] =
                await pool.query(
                    `
                    SELECT customer_id

                    FROM customers

                    WHERE phone = ?
                        AND name = ?

                    LIMIT 1
                    `,
                    [customerPhone, customerName]
                );


            let customerId;


            // Existing customer
            if (
                existingCustomer.length > 0
            ) {

                customerId =
                    existingCustomer[0]
                        .customer_id;

            }


            // New customer
            else {

                const [result] =
                    await pool.query(
                        `
                        INSERT INTO customers
                        (
                            name,
                            phone
                        )

                        VALUES (?, ?)
                        `,
                        [
                            customerName,
                            customerPhone
                        ]
                    );


                customerId =
                    result.insertId;

            }


            // ----------------------------------------------
            // Create order
            // ----------------------------------------------

            const [orderResult] =
                await pool.query(
                    `
                    INSERT INTO orders
                    (
                        customer_id,
                        customer_name,
                        phone,
                        repair_type,
                        delivery_date,
                        repair_cost,
                        status
                    )

                    VALUES
                    (
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        'Received'
                    )
                    `,
                    [
                        customerId,
                        customerName,
                        customerPhone,
                        repairType,
                        deliveryDate,
                        repairCost
                    ]
                );


            res.status(201).json({

                message:
                    "Repair order created successfully.",

                orderId:
                    orderResult.insertId

            });


        } catch (error) {

            console.error(
                "CREATE ORDER ERROR:",
                error
            );


            res.status(500).json({

                error:
                    "Failed to create order."

            });

        }

    }
);


// ======================================================
// UPDATE ORDER STATUS
// ======================================================

app.put(
    "/api/orders/:id/status",
    async (req, res) => {

        try {

            const {
                status
            } = req.body;


            const allowedStatuses = [

                "Received",

                "Repairing",

                "Ready",

                "Delivered"

            ];


            if (
                !allowedStatuses.includes(status)
            ) {

                return res.status(400).json({

                    error:
                        "Invalid order status."

                });

            }


            const [result] =
                await pool.query(
                    `
                    UPDATE orders

                    SET status = ?

                    WHERE order_id = ?

                    `,
                    [
                        status,
                        req.params.id
                    ]
                );


            if (
                result.affectedRows === 0
            ) {

                return res.status(404).json({

                    error:
                        "Order not found."

                });

            }


            res.json({

                message:
                    "Order status updated successfully."

            });


        } catch (error) {

            console.error(
                "STATUS UPDATE ERROR:",
                error
            );


            res.status(500).json({

                error:
                    "Failed to update status."

            });

        }

    }
);


// ======================================================
// GET CUSTOMERS
// ======================================================

app.get(
    "/api/customers",
    async (req, res) => {

        try {

            const [customers] =
                await pool.query(`

                    SELECT

                        c.customer_id,

                        c.name,

                        c.phone,

                        c.created_at,

                        (

                            SELECT o.status

                            FROM orders o

                            WHERE
                                o.customer_id =
                                c.customer_id

                            ORDER BY
                                o.order_id DESC

                            LIMIT 1

                        ) AS status

                    FROM customers c

                    ORDER BY
                        c.customer_id DESC

                `);


            res.json(customers);


        } catch (error) {

            console.error(
                "CUSTOMERS ERROR:",
                error
            );


            res.status(500).json({

                error:
                    "Failed to load customers."

            });

        }

    }
);


// ======================================================
// CUSTOMER DETAILS
// ======================================================

app.get(
    "/api/customers/:id",
    async (req, res) => {

        try {

            const [customers] =
                await pool.query(
                    `
                    SELECT *

                    FROM customers

                    WHERE customer_id = ?

                    LIMIT 1
                    `,
                    [req.params.id]
                );


            if (
                customers.length === 0
            ) {

                return res.status(404).json({

                    error:
                        "Customer not found."

                });

            }


            const [orders] =
                await pool.query(
                    `
                    SELECT *

                    FROM orders

                    WHERE customer_id = ?

                    ORDER BY order_id DESC

                    `,
                    [req.params.id]
                );


            res.json({

                customer:
                    customers[0],

                orders:
                    orders

            });


        } catch (error) {

            console.error(
                "CUSTOMER DETAILS ERROR:",
                error
            );


            res.status(500).json({

                error:
                    "Failed to load customer."

            });

        }

    }
);


// ======================================================
// REPORTS
// ======================================================

app.get(
    "/api/reports",
    async (req, res) => {

        try {

            const [total] =
                await pool.query(`

                    SELECT COUNT(*) AS total

                    FROM orders

                `);


            const [completed] =
                await pool.query(`

                    SELECT COUNT(*) AS total

                    FROM orders

                    WHERE status = 'Delivered'

                `);


            const [pending] =
                await pool.query(`

                    SELECT COUNT(*) AS total

                    FROM orders

                    WHERE status IN
                    ('Received', 'Repairing')

                `);


            const [revenue] =
                await pool.query(`

                    SELECT

                        COALESCE(
                            SUM(repair_cost),
                            0
                        ) AS total

                    FROM orders

                    WHERE status = 'Delivered'

                    AND MONTH(created_at)
                        = MONTH(CURDATE())

                    AND YEAR(created_at)
                        = YEAR(CURDATE())

                `);


            res.json({

                totalOrders:
                    total[0].total,

                completed:
                    completed[0].total,

                pending:
                    pending[0].total,

                revenue:
                    revenue[0].total

            });


        } catch (error) {

            console.error(
                "REPORTS ERROR:",
                error
            );


            res.status(500).json({

                error:
                    "Failed to load reports."

            });

        }

    }
);


// ======================================================
// START SERVER
// ======================================================

async function startServer() {

    await initializeDatabase();


    app.listen(
        PORT,
        () => {

            console.log("");
            console.log(
                "========================================"
            );

            console.log(
                "       ReSole Backend Started"
            );

            console.log(
                "========================================"
            );

            console.log(
                "Server: http://localhost:5000"
            );

            console.log(
                "MySQL: 127.0.0.1:3307"
            );

            console.log(
                "Admin Phone: 7838481754"
            );

            console.log(
                "Admin Password: admin123"
            );

            console.log(
                "========================================"
            );

        }
    );

}


startServer();