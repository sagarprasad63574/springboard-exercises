const express = require("express");
const ExpressError = require("../expressError")
const router = express.Router();
const db = require("../db");

router.get('/', async (req, res, next) => {
    try {
        const results = await db.query(`SELECT id, comp_code FROM invoices`);
        return res.json({ invoices: results.rows })
    } catch (e) {
        return next(e);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const findInvoice = await db.query('SELECT * FROM invoices WHERE id = $1', [id])
        if (findInvoice.rows.length === 0) {
            throw new ExpressError(`Can't find a invoice with id of ${id}`, 404)
        }
        const invoice = findInvoice.rows[0];
        const findCompany = await db.query(`SELECT * FROM companies WHERE code = $1`, [invoice.comp_code])
        if (findCompany.rows.length === 0) {
            throw new ExpressError(`Can't find a company with code of ${invoice.comp_code}`, 404)
        }
        const company = findCompany.rows[0]
        return res.send({ invoice: {id: invoice.id, amt: invoice.amt, paid: invoice.paid, 
                        add_date: invoice.add_date, paid_date: invoice.paid_date, 
                        company: company } })
    } catch (e) {
        return next(e)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { comp_code, amt } = req.body;
        const company = await db.query('SELECT * FROM companies WHERE code = $1', [comp_code])
        if (company.rows.length === 0) {
            throw new ExpressError(`Can't find a company with code of ${comp_code}`, 404)
        }
        const results = await db.query('INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING id, comp_code, amt, paid, add_date, paid_date', [comp_code, amt]);
        return res.status(201).json({ invoice: results.rows[0] })
    } catch (e) {
        return next(e)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { amt, paid } = req.body;
        let paidDate = null;

        const currResult = await db.query(`SELECT paid FROM invoices WHERE id = $1`, [id]);
        if (currResult.rows.length === 0) {
            throw new ExpressError(`No such invoice: ${id}`, 404);
        }

        const currPaidDate = currResult.rows[0].paid_date;

        if (!currPaidDate && paid) {
            paidDate = new Date();
        } else if (!paid) {
            paidDate = null
        } else {
            paidDate = currPaidDate;
        }

        const results = await db.query(
            `UPDATE invoices 
            SET amt=$1, paid=$2, paid_date=$3 
            WHERE id=$4 
            RETURNING id, comp_code, amt, paid, add_date, paid_date`, 
            [amt, paid, paidDate, id])
            
        return res.json({ invoice: results.rows[0] })
    } catch (e) {
        return next(e)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const findInvoice = await db.query('SELECT * FROM invoices WHERE id = $1', [id])
        if (findInvoice.rows.length === 0) {
            throw new ExpressError(`Can't find a invoice with id of ${id}`, 404)
        }
        const results = db.query('DELETE FROM invoices WHERE id = $1', [id])
        return res.send({ status: "deleted" })
    } catch (e) {
        return next(e)
    }
})

module.exports = router;