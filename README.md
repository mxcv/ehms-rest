<h1>Employee Holiday Management System</h1>

<h2>Getting Started</h2>

<ol>
<li>Clone this repository: https://github.com/mxcv/ehms-rest.git</li>
<li>Install dependencies using <code>npm install</code>.</li>
<li>Start the server with <code>npm run start</code>.</li>
<li>Access the application at <a href="http://localhost:3000/">http://localhost:3000/</a> in your browser.</li>
</ol>

<h2>Controllers</h2>

<h3>Employees</h3>

<ul>
<li><strong>Route:</strong> /employees</li>
<li>Displays a list of employees with their remaining holidays.</li>
<li><strong>API Route:</strong> /api/employees</li>
<li>Returns JSON objects representing employees. Useful for testing purposes.</li>
</ul>

<h3>Requests</h3>

<ul>
<li><strong>Route:</strong> /requests</li>
<li>Displays a list of holiday requests with options to approve or reject.</li>
<li><strong>API Route:</strong> /api/requests</li>
<li>Returns JSON objects representing holiday requests. Useful for testing purposes.</li>
</ul>

<h2>Adding Employees and Managing Holiday Requests</h2>

<h3>Adding Employees</h3>

<ol>
<li>Navigate to the application.</li>
<li>Use an input field and a button labeled "Add" to add employees.</li>
<li>After entering employee details and clicking "Add," the employee should be added to the system.</li>
    </ol>

<h3>Managing Holiday Requests</h3>

<ol>
<li>After adding an employee, you can submit a holiday request by default. It will be automatically approved.</li>
<li>However, you have the functionality to edit the request status to either "Pending" or "Rejected" after creation.</li>
<li>If the request is approved, you can view the employee and all their approved holidays.</li>
</ol>

<h2>Displaying Employee Holidays</h2>

<ul>
<li><strong>One-to-Many Relationship:</strong> Each employee can have multiple holiday requests. Display all approved holidays for each employee.</li>
</ul>

<h2>Future Extensions (SOLID Principles)</h2>

<ul>
<li><strong>Extensibility:</strong> The application is designed to be easily extendable. For example:
<ul>
<li>Adding the ability to delete employees.</li>
<li>Allowing edits to employee data if changes occur.</li>
<li>In the future, the functionality can be extended to include collective vacations</li>
</li>
</ul>
<h2>Contributors</h2>
<ul>
<li>Maksym Chervinskyi</li>
<li>Yevhen Kupriiuk</li>
</ul>

