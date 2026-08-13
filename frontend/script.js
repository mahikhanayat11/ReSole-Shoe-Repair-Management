const app = document.getElementById("app");


/* =====================================================
   AUTH GUARD
===================================================== */

if (
    !localStorage.getItem(
        "resoleAdmin"
    )
) {

    window.location.href =
        "login.html";

}


/* =====================================================
   HTML
===================================================== */

app.innerHTML = `

<div class="app-layout">


    <!-- SIDEBAR -->

    <aside class="sidebar">

        <div class="logo">

            <div class="logo-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 16.2c0-.9.5-1.7 1.3-2.1l3.4-1.7c.5-.3.9-.7 1.1-1.2l1-2.3c.4-.9 1.3-1.5 2.3-1.5h2.1c.6 0 1.1.2 1.6.6l4.3 3.7c.5.4 1.1.7 1.8.7h1.6c1.1 0 2 .9 2 2v2.3c0 1.1-.9 2-2 2H4.5c-1.1 0-2-.9-2-2v-.5z" fill="currentColor"/>
                    <path d="M7 10.5V6.8c0-.7.6-1.3 1.3-1.3h2.4c.5 0 .9.3 1.1.7l1.2 2.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2.5 17.5h19" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
                </svg>
            </div>

            <div>

                <h2>ReSole</h2>

                <span>
                    Repair Management
                </span>

            </div>

        </div>


        <nav>

            <a
                href="?page=dashboard"
                class="nav-item"
                data-page="dashboard"
            >
                <span>⌂</span>
                Dashboard
            </a>


            <a
                href="?page=new-order"
                class="nav-item"
                data-page="new-order"
            >
                <span>＋</span>
                New Order
            </a>


            <a
                href="?page=orders"
                class="nav-item"
                data-page="orders"
            >
                <span>▤</span>
                Orders
            </a>


            <a
                href="?page=customers"
                class="nav-item"
                data-page="customers"
            >
                <span>♙</span>
                Customers
            </a>


            <a
                href="?page=reports"
                class="nav-item"
                data-page="reports"
            >
                <span>▥</span>
                Reports
            </a>

        </nav>


        <div class="sidebar-bottom">

            <div class="user-box">

                <div class="avatar">
                    A
                </div>

                <div>

                    <strong>
                        Admin
                    </strong>

                    <small>
                        Administrator
                    </small>

                </div>

            </div>


            <button
                class="logout-btn"
                id="logoutBtn"
            >
                ↪ Logout
            </button>

        </div>

    </aside>



    <!-- MAIN -->

    <main class="main-content">


        <!-- =====================
             DASHBOARD
        ====================== -->

        <section
            id="dashboardPage"
            class="page-content"
        >

            <header class="topbar">

                <div>

                    <h1>
                        Dashboard
                    </h1>

                    <p>
                        Welcome back! Here's what's happening today.
                    </p>

                </div>


                <div class="top-actions">

                    <button class="notification">
                        ♧
                    </button>


                    <div class="profile">

                        <div class="avatar">
                            A
                        </div>

                        <div>

                            <strong>
                                Admin
                            </strong>

                            <small>
                                Manager
                            </small>

                        </div>

                    </div>

                </div>

            </header>


            <section class="stats-grid">


                <div class="stat-card">

                    <div class="stat-icon purple">
                        ▤
                    </div>

                    <div>

                        <span>
                            Today's Orders
                        </span>

                        <h2 id="todayOrders">
                            0
                        </h2>

                        <small class="positive">
                            Today's repair orders
                        </small>

                    </div>

                </div>



                <div class="stat-card">

                    <div class="stat-icon orange">
                        ◷
                    </div>

                    <div>

                        <span>
                            Pending Repairs
                        </span>

                        <h2 id="pendingRepairs">
                            0
                        </h2>

                        <small class="warning">
                            Needs attention
                        </small>

                    </div>

                </div>



                <div class="stat-card">

                    <div class="stat-icon green">
                        ✓
                    </div>

                    <div>

                        <span>
                            Completed
                        </span>

                        <h2 id="completedRepairs">
                            0
                        </h2>

                        <small class="positive">
                            Delivered repairs
                        </small>

                    </div>

                </div>



                <div class="stat-card">

                    <div class="stat-icon blue">
                        ▣
                    </div>

                    <div>

                        <span>
                            Ready for Pickup
                        </span>

                        <h2 id="readyPickup">
                            0
                        </h2>

                        <small>
                            Customers notified
                        </small>

                    </div>

                </div>

            </section>



            <section class="dashboard-grid">


                <div class="panel">

                    <div class="panel-header">

                        <div>

                            <h2>
                                Recent Orders
                            </h2>

                            <p>
                                Latest repair orders
                            </p>

                        </div>


                        <button
                            class="view-btn"
                            id="viewOrdersBtn"
                        >
                            View All →
                        </button>

                    </div>


                    <div class="table-container">

                        <table>

                            <thead>

                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Repair</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>

                            </thead>


                            <tbody id="recentOrders">

                                <tr>

                                    <td
                                        colspan="5"
                                        style="
                                            text-align:center;
                                            padding:30px;
                                            color:#999;
                                        "
                                    >
                                        No orders yet
                                    </td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>



                <div class="panel quick-panel">

                    <div class="panel-header">

                        <div>

                            <h2>
                                Quick Actions
                            </h2>

                            <p>
                                Manage your repairs
                            </p>

                        </div>

                    </div>


                    <button
                        class="quick-action"
                        id="quickNewOrder"
                    >

                        <div class="quick-icon purple">
                            ＋
                        </div>

                        <div>

                            <strong>
                                New Repair Order
                            </strong>

                            <span>
                                Create a new repair order
                            </span>

                        </div>

                        <b>→</b>

                    </button>


                    <button
                        class="quick-action"
                        id="quickTrack"
                    >

                        <div class="quick-icon blue">
                            ⌕
                        </div>

                        <div>

                            <strong>
                                Track Repair
                            </strong>

                            <span>
                                Check repair status
                            </span>

                        </div>

                        <b>→</b>

                    </button>


                    <button
                        class="quick-action"
                        id="quickBill"
                    >

                        <div class="quick-icon green">
                            ▣
                        </div>

                        <div>

                            <strong>
                                Generate Bill
                            </strong>

                            <span>
                                Create customer invoice
                            </span>

                        </div>

                        <b>→</b>

                    </button>

                </div>

            </section>



            <section class="revenue-card">

                <div>

                    <span>
                        Total Revenue
                    </span>

                    <h2 id="totalRevenue">
                        ₹0
                    </h2>

                    <p>
                        Revenue from delivered repairs
                    </p>

                </div>


                <div class="revenue-chart">

                    <div style="height:35%"></div>
                    <div style="height:55%"></div>
                    <div style="height:45%"></div>
                    <div style="height:70%"></div>
                    <div style="height:60%"></div>
                    <div style="height:85%"></div>
                    <div style="height:75%"></div>
                    <div style="height:95%"></div>

                </div>

            </section>

        </section>



        <!-- =====================
             NEW ORDER
        ====================== -->

        <section
            id="newOrderPage"
            class="page-content"
        >

            <div class="page-title">

                <h1>
                    New Repair Order
                </h1>

                <p>
                    Create a new shoe repair order
                </p>

            </div>


            <div class="form-card">

                <div class="form-heading">

                    <h2>
                        Customer & Repair Details
                    </h2>

                    <p>
                        Enter the customer's information and repair details.
                    </p>

                </div>


                <form id="repairOrderForm">

                    <div class="form-grid">


                        <div class="form-group">

                            <label>
                                Customer Name
                            </label>

                            <input
                                type="text"
                                id="customerName"
                                placeholder="Enter customer name"
                                required
                            >

                        </div>


                        <div class="form-group">

                            <label>
                                Phone Number
                            </label>

                            <input
                                type="tel"
                                id="customerPhone"
                                placeholder="Enter phone number"
                                required
                            >

                        </div>


                        <div class="form-group">

                            <label>
                                Repair Type
                            </label>

                            <select
                                id="repairType"
                                required
                            >

                                <option value="">
                                    Select repair type
                                </option>

                                <option value="Sole Replacement">
                                    Sole Replacement
                                </option>

                                <option value="Heel Repair">
                                    Heel Repair
                                </option>

                                <option value="Stitching">
                                    Stitching
                                </option>

                                <option value="Polishing">
                                    Polishing
                                </option>

                                <option value="Color Restoration">
                                    Color Restoration
                                </option>

                            </select>

                        </div>


                        <div class="form-group">

                            <label>
                                Delivery Date
                            </label>

                            <input
                                type="date"
                                id="deliveryDate"
                                required
                            >

                        </div>


                        <div class="form-group">

                            <label>
                                Repair Cost (₹)
                            </label>

                            <input
                                type="number"
                                id="repairCost"
                                placeholder="Enter repair cost"
                                min="0"
                                required
                            >

                        </div>

                    </div>


                    <div class="form-actions">

                        <button
                            type="reset"
                            class="cancel-btn"
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            class="save-btn"
                        >
                            Save Repair Order
                        </button>

                    </div>

                </form>

            </div>

        </section>



        <!-- =====================
             ORDERS
        ====================== -->

        <section
            id="ordersPage"
            class="page-content"
        >

            <div class="page-title">

                <h1>
                    Orders
                </h1>

                <p>
                    Manage all shoe repair orders
                </p>

            </div>


            <div class="panel">

                <div class="panel-header">

                    <div>

                        <h2>
                            All Repair Orders
                        </h2>

                        <p>
                            View and manage customer repairs
                        </p>

                    </div>

                </div>


                <div class="table-container">

                    <table>

                        <thead>

                            <tr>

                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Repair</th>
                                <th>Delivery</th>
                                <th>Cost</th>
                                <th>Status</th>
                                <th>Action</th>

                            </tr>

                        </thead>


                        <tbody id="ordersTable">

                            <tr>

                                <td
                                    colspan="7"
                                    style="
                                        text-align:center;
                                        padding:30px;
                                    "
                                >
                                    No orders available
                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </section>



        <!-- =====================
             CUSTOMERS
        ====================== -->

        <section
            id="customersPage"
            class="page-content"
        >

            <div class="page-title">

                <h1>
                    Customers
                </h1>

                <p>
                    Manage your customers
                </p>

            </div>


            <div class="panel">

                <div class="panel-header">

                    <div>

                        <h2>
                            Customer List
                        </h2>

                        <p>
                            All registered customers
                        </p>

                    </div>


                    <input
                        type="text"
                        id="customerSearch"
                        placeholder="Search customer..."
                        style="
                            padding:10px;
                            border:1px solid #ddd;
                            border-radius:8px;
                        "
                    >

                </div>


                <div class="table-container">

                    <table>

                        <thead>

                            <tr>

                                <th>ID</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Joined</th>

                            </tr>

                        </thead>


                        <tbody id="customersTable">

                            <tr>

                                <td
                                    colspan="4"
                                    style="
                                        text-align:center;
                                        padding:30px;
                                    "
                                >
                                    No customers available
                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </section>



        <!-- =====================
             REPORTS
        ====================== -->

        <section
            id="reportsPage"
            class="page-content"
        >

            <div class="page-title">

                <h1>
                    Reports
                </h1>

                <p>
                    View repair and revenue reports
                </p>

            </div>


            <section class="stats-grid">


                <div class="stat-card">

                    <div class="stat-icon purple">
                        ▤
                    </div>

                    <div>

                        <span>
                            Total Orders
                        </span>

                        <h2 id="reportTotalOrders">
                            0
                        </h2>

                    </div>

                </div>


                <div class="stat-card">

                    <div class="stat-icon green">
                        ✓
                    </div>

                    <div>

                        <span>
                            Completed
                        </span>

                        <h2 id="reportCompleted">
                            0
                        </h2>

                    </div>

                </div>


                <div class="stat-card">

                    <div class="stat-icon orange">
                        ◷
                    </div>

                    <div>

                        <span>
                            Pending
                        </span>

                        <h2 id="reportPending">
                            0
                        </h2>

                    </div>

                </div>


                <div class="stat-card">

                    <div class="stat-icon blue">
                        ₹
                    </div>

                    <div>

                        <span>
                            Revenue
                        </span>

                        <h2 id="reportRevenue">
                            ₹0
                        </h2>

                    </div>

                </div>

            </section>


            <div class="panel">

                <div class="panel-header">

                    <div>

                        <h2>
                            Orders Overview
                        </h2>

                        <p>
                            Current repair order summary
                        </p>

                    </div>

                </div>


                <div
                    id="reportOverview"
                    style="
                        padding:30px;
                        text-align:center;
                        color:#999;
                    "
                >
                    No order data available yet.
                </div>

            </div>

        </section>



        <footer>

            <p>
                ReSole © 2026 • Developed by Mahi Khanayat
            </p>

            <span>
                Built during internship at Talking Crooks IT Pvt. Ltd.
            </span>

        </footer>

    </main>

</div>
`;



/* =====================================================
   PAGE REFERENCES
===================================================== */

const pages = {

    dashboard:
        document.getElementById("dashboardPage"),

    "new-order":
        document.getElementById("newOrderPage"),

    orders:
        document.getElementById("ordersPage"),

    customers:
        document.getElementById("customersPage"),

    reports:
        document.getElementById("reportsPage")

};



/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showPage(
    pageName,
    updateURL = true
) {

    // Invalid page = dashboard
    if (!pages[pageName]) {
        pageName = "dashboard";
    }


    /* Hide ALL pages */

    Object.values(pages).forEach(page => {

        page.classList.remove(
            "active-page"
        );

    });


    /* Show ONLY selected page */

    pages[pageName].classList.add(
        "active-page"
    );


    /* Sidebar active */

    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.remove(
                "active"
            );

        });


    const activeItem =
        document.querySelector(
            `.nav-item[data-page="${pageName}"]`
        );


    if (activeItem) {

        activeItem.classList.add(
            "active"
        );

    }


    /* Update URL */

    if (updateURL) {

        const url =
            new URL(
                window.location.href
            );

        url.searchParams.set(
            "page",
            pageName
        );


        history.pushState(
            {
                page: pageName
            },
            "",
            url
        );

    }


    /* Load page data */

    if (pageName === "dashboard") {
        loadDashboard();
    }

    if (pageName === "orders") {
        loadOrders();
    }

    if (pageName === "customers") {
        loadCustomers();
    }

    if (pageName === "reports") {
        loadReports();
    }

}



/* =====================================================
   SIDEBAR CLICK
===================================================== */

document
    .querySelectorAll(".nav-item")
    .forEach(item => {

        item.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                const page =
                    this.dataset.page;

                showPage(page);

            }
        );

    });



/* =====================================================
   BACK / FORWARD
===================================================== */

window.addEventListener(
    "popstate",
    function() {

        const url =
            new URL(
                window.location.href
            );

        const page =
            url.searchParams.get(
                "page"
            ) || "dashboard";


        showPage(
            page,
            false
        );

    }
);



/* =====================================================
   QUICK ACTIONS
===================================================== */

document
    .getElementById("quickNewOrder")
    .addEventListener(
        "click",
        function() {

            showPage(
                "new-order"
            );

        }
    );


document
    .getElementById("quickTrack")
    .addEventListener(
        "click",
        function() {

            showPage(
                "orders"
            );

        }
    );


document
    .getElementById("quickBill")
    .addEventListener(
        "click",
        function() {

            showPage(
                "orders"
            );

        }
    );


document
    .getElementById("viewOrdersBtn")
    .addEventListener(
        "click",
        function() {

            showPage(
                "orders"
            );

        }
    );



/* =====================================================
   DASHBOARD
===================================================== */

async function loadDashboard() {

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/dashboard"
            );


        if (!response.ok) {
            throw new Error(
                "Dashboard API error"
            );
        }


        const data =
            await response.json();


        document.getElementById(
            "todayOrders"
        ).textContent =
            data.todayOrders || 0;


        document.getElementById(
            "pendingRepairs"
        ).textContent =
            data.pendingRepairs || 0;


        document.getElementById(
            "completedRepairs"
        ).textContent =
            data.completed || 0;


        document.getElementById(
            "readyPickup"
        ).textContent =
            data.readyPickup || 0;


        document.getElementById(
            "totalRevenue"
        ).textContent =
            "₹" +
            Number(
                data.revenue || 0
            ).toLocaleString(
                "en-IN"
            );


        loadRecentOrders();


    } catch (error) {

        console.error(
            "Dashboard Error:",
            error
        );

    }

}



/* =====================================================
   RECENT ORDERS
===================================================== */

async function loadRecentOrders() {

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/orders"
            );


        if (!response.ok) {
            throw new Error(
                "Orders API error"
            );
        }


        const orders =
            await response.json();


        const recent =
            Array.isArray(orders)
                ? orders.slice(0, 4)
                : [];


        const table =
            document.getElementById(
                "recentOrders"
            );


        if (recent.length === 0) {

            table.innerHTML = `

                <tr>

                    <td
                        colspan="5"
                        style="
                            text-align:center;
                            padding:30px;
                            color:#999;
                        "
                    >
                        No orders yet
                    </td>

                </tr>

            `;

            return;

        }


        table.innerHTML =
            recent.map(order => `

                <tr>

                    <td>
                        <strong>
                            #RS${order.order_id}
                        </strong>
                    </td>

                    <td>
                        ${order.customer_name}
                    </td>

                    <td>
                        ${order.repair_type}
                    </td>

                    <td>
                        ₹${Number(
                            order.repair_cost || 0
                        ).toLocaleString(
                            "en-IN"
                        )}
                    </td>

                    <td>

                        <span
                            class="
                                status
                                ${getStatusClass(
                                    order.status
                                )}
                            "
                        >
                            ${order.status}
                        </span>

                    </td>

                </tr>

            `).join("");


    } catch (error) {

        console.error(
            "Recent Orders Error:",
            error
        );

    }

}



/* =====================================================
   CREATE ORDER
===================================================== */

document
    .getElementById(
        "repairOrderForm"
    )
    .addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const customerName =
                document
                    .getElementById(
                        "customerName"
                    )
                    .value.trim();


            const customerPhone =
                document
                    .getElementById(
                        "customerPhone"
                    )
                    .value.trim();


            const repairType =
                document
                    .getElementById(
                        "repairType"
                    )
                    .value;


            const deliveryDate =
                document
                    .getElementById(
                        "deliveryDate"
                    )
                    .value;


            const repairCost =
                document
                    .getElementById(
                        "repairCost"
                    )
                    .value;


            try {

                const response =
                    await fetch(
                        "http://localhost:5000/api/orders",
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                customerName,
                                customerPhone,
                                repairType,
                                deliveryDate,
                                repairCost

                            })

                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    alert(
                        data.error ||
                        "Failed to create order."
                    );

                    return;

                }


                alert(
                    "Repair order created successfully!\n\n" +
                    "Order ID: #RS" +
                    data.orderId
                );


                document
                    .getElementById(
                        "repairOrderForm"
                    )
                    .reset();


                showPage(
                    "orders"
                );


            } catch (error) {

                console.error(
                    error
                );

                alert(
                    "Unable to connect to server."
                );

            }

        }
    );



/* =====================================================
   LOAD ORDERS
===================================================== */

async function loadOrders() {

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/orders"
            );


        const orders =
            await response.json();


        const table =
            document.getElementById(
                "ordersTable"
            );


        if (
            !Array.isArray(orders) ||
            orders.length === 0
        ) {

            table.innerHTML = `

                <tr>

                    <td
                        colspan="7"
                        style="
                            text-align:center;
                            padding:30px;
                        "
                    >
                        No orders available
                    </td>

                </tr>

            `;

            return;

        }


        table.innerHTML =
            orders.map(order => `

                <tr>

                    <td>
                        <strong>
                            #RS${order.order_id}
                        </strong>
                    </td>

                    <td>
                        ${order.customer_name}
                    </td>

                    <td>
                        ${order.repair_type}
                    </td>

                    <td>
                        ${formatDate(
                            order.delivery_date
                        )}
                    </td>

                    <td>
                        ₹${Number(
                            order.repair_cost || 0
                        ).toLocaleString(
                            "en-IN"
                        )}
                    </td>

                    <td>

                        <select
                            class="status-select"
                            id="status-${order.order_id}"
                        >

                            <option
                                value="Received"
                                ${
                                    order.status === "Received"
                                        ? "selected"
                                        : ""
                                }
                            >
                                Received
                            </option>


                            <option
                                value="Repairing"
                                ${
                                    order.status === "Repairing"
                                        ? "selected"
                                        : ""
                                }
                            >
                                Repairing
                            </option>


                            <option
                                value="Ready"
                                ${
                                    order.status === "Ready"
                                        ? "selected"
                                        : ""
                                }
                            >
                                Ready
                            </option>


                            <option
                                value="Delivered"
                                ${
                                    order.status === "Delivered"
                                        ? "selected"
                                        : ""
                                }
                            >
                                Delivered
                            </option>

                        </select>

                    </td>


                    <td>

                        <button
                            class="update-status-btn"
                            onclick="
                                updateOrderStatus(
                                    ${order.order_id}
                                )
                            "
                        >
                            Update
                        </button>

                    </td>

                </tr>

            `).join("");


    } catch (error) {

        console.error(
            "Orders Error:",
            error
        );

    }

}



/* =====================================================
   UPDATE ORDER STATUS
===================================================== */

async function updateOrderStatus(
    orderId
) {

    const select =
        document.getElementById(
            `status-${orderId}`
        );


    if (!select) {
        return;
    }


    const status =
        select.value;


    try {

        const response =
            await fetch(
                `http://localhost:5000/api/orders/${orderId}/status`,
                {

                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        status
                    })

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            alert(
                data.error ||
                "Failed to update status."
            );

            return;

        }


        alert(
            "Order status updated successfully!"
        );


        await loadOrders();

        await loadDashboard();


    } catch (error) {

        console.error(
            error
        );

        alert(
            "Unable to connect to server."
        );

    }

}



/* =====================================================
   CUSTOMERS
===================================================== */

async function loadCustomers() {

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/customers"
            );


        const customers =
            await response.json();


        const table =
            document.getElementById(
                "customersTable"
            );


        if (
            !Array.isArray(customers) ||
            customers.length === 0
        ) {

            table.innerHTML = `

                <tr>

                    <td
                        colspan="4"
                        style="
                            text-align:center;
                            padding:30px;
                        "
                    >
                        No customers available
                    </td>

                </tr>

            `;

            return;

        }


        table.innerHTML =
            customers.map(customer => `

                <tr>

                    <td>
                        #${customer.customer_id}
                    </td>

                    <td>

                        <strong>
                            ${customer.name}
                        </strong>

                    </td>

                    <td>
                        ${customer.phone}
                    </td>

                    <td>
                        ${formatDate(
                            customer.created_at
                        )}
                    </td>

                </tr>

            `).join("");


        setupCustomerSearch();


    } catch (error) {

        console.error(
            "Customers Error:",
            error
        );

    }

}



/* =====================================================
   CUSTOMER SEARCH
===================================================== */

function setupCustomerSearch() {

    const search =
        document.getElementById(
            "customerSearch"
        );


    if (!search) {
        return;
    }


    search.oninput =
        function() {

            const value =
                this.value
                    .toLowerCase()
                    .trim();


            const rows =
                document.querySelectorAll(
                    "#customersTable tr"
                );


            rows.forEach(row => {

                row.style.display =
                    row.textContent
                        .toLowerCase()
                        .includes(value)
                        ? ""
                        : "none";

            });

        };

}



/* =====================================================
   REPORTS
===================================================== */

async function loadReports() {

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/reports"
            );


        const data =
            await response.json();


        document.getElementById(
            "reportTotalOrders"
        ).textContent =
            data.totalOrders || 0;


        document.getElementById(
            "reportCompleted"
        ).textContent =
            data.completed || 0;


        document.getElementById(
            "reportPending"
        ).textContent =
            data.pending || 0;


        document.getElementById(
            "reportRevenue"
        ).textContent =
            "₹" +
            Number(
                data.revenue || 0
            ).toLocaleString(
                "en-IN"
            );


        document.getElementById(
            "reportOverview"
        ).innerHTML = `

            <div
                style="
                    display:flex;
                    justify-content:center;
                    gap:40px;
                    flex-wrap:wrap;
                "
            >

                <div>

                    <strong>
                        Total Orders
                    </strong>

                    <p>
                        ${data.totalOrders || 0}
                    </p>

                </div>


                <div>

                    <strong>
                        Completed
                    </strong>

                    <p>
                        ${data.completed || 0}
                    </p>

                </div>


                <div>

                    <strong>
                        Pending
                    </strong>

                    <p>
                        ${data.pending || 0}
                    </p>

                </div>

            </div>

        `;


    } catch (error) {

        console.error(
            "Reports Error:",
            error
        );

    }

}



/* =====================================================
   HELPERS
===================================================== */

function formatDate(date) {

    if (!date) {
        return "-";
    }


    const d =
        new Date(date);


    if (
        Number.isNaN(
            d.getTime()
        )
    ) {

        return "-";

    }


    return d.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}



function getStatusClass(status) {

    if (status === "Repairing") {
        return "repairing";
    }

    if (status === "Ready") {
        return "ready";
    }

    if (status === "Received") {
        return "received";
    }

    if (status === "Delivered") {
        return "delivered";
    }

    return "";

}



/* =====================================================
   LOGOUT
===================================================== */

document
    .getElementById("logoutBtn")
    .addEventListener(
        "click",
        function() {

            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (!confirmLogout) {
                return;
            }


            localStorage.removeItem(
                "resoleAdmin"
            );


            window.location.href =
                "login.html";

        }
    );



/* =====================================================
   INITIAL PAGE
===================================================== */

const currentURL =
    new URL(
        window.location.href
    );


const initialPage =
    currentURL.searchParams.get(
        "page"
    ) || "dashboard";


showPage(
    initialPage,
    false
);