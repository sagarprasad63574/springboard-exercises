/** code common to tests. */
process.env.NODE_ENV = "test";

const db = require("./db");


async function createData() {
       await db.query("DELETE FROM invoices");
       await db.query("DELETE FROM companies");
       await db.query("DELETE FROM companies_industries");
       await db.query("DELETE FROM industries");
       await db.query("SELECT setval('invoices_id_seq', 1, false)");

       await db.query(`INSERT INTO companies (code, name, description)
                    VALUES ('apple', 'Apple', 'Maker of OSX.'),
                           ('ibm', 'IBM', 'Big blue.')`);

       await db.query(
              `INSERT INTO invoices (comp_code, amt, paid, add_date, paid_date)
           VALUES ('apple', 100, false, '2018-01-01', null),
                  ('apple', 200, true, '2018-02-01', '2018-02-02'), 
                  ('ibm', 300, false, '2018-03-01', null)
           RETURNING id`);

       await db.query(`INSERT INTO industries (code, industry) 
                     VALUES ('acct', 'Accounting'),
                            ('ed', 'Educational')`);

       await db.query(`INSERT INTO companies_industries (company_code, industry_code) 
                     VALUES ('apple', 'acct'),
                            ('apple', 'ed'),
                            ('ibm', 'acct')`);
}


module.exports = { createData };
