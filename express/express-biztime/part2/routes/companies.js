const express = require("express");
const ExpressError = require("../expressError")
const slugify = require("slugify");
const router = express.Router();
const db = require("../db");

router.get('/', async (req, res, next) => {
    try {
        const results = await db.query(`SELECT * FROM companies`);
        return res.json({ companies: results.rows })
    } catch (e) {
        return next(e);
    }
})

router.get('/:code', async (req, res, next) => {
    try {
        const { code } = req.params;
        const findCompany = await db.query('SELECT * FROM companies WHERE code = $1', [code])
        if (findCompany.rows.length === 0) {
            throw new ExpressError(`Can't find a company with code of ${code}`, 404)
        }
        const findInvoices = await db.query('SELECT id FROM invoices WHERE comp_code=$1', [code])
    
        const findIndustries = await db.query(`
        SELECT i.industry  
        FROM companies AS c
        JOIN companies_industries AS ci
        ON c.code = ci.company_code
        JOIN industries AS i
        ON ci.industry_code = i.code
        WHERE c.code = $1`, [code])

        const company = findCompany.rows[0];
        const invoices = findInvoices.rows; 
        const industries = findIndustries.rows;

        company.invoices = invoices.map(inv => inv.id);
        company.industries = industries.map(indus => indus.industry); 

        return res.send({ company: company })
    } catch (e) {
        return next(e)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const code = slugify(name, {lower: true});
        const results = await db.query('INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description', [code, name, description]);
        return res.status(201).json({ company: results.rows[0] })
    } catch (e) {
        return next(e)
    }
})

router.put('/:code', async (req, res, next) => {
    try {
        const { code } = req.params;
        const { name, description } = req.body;
        const results = await db.query('UPDATE companies SET name=$1, description=$2 WHERE code=$3 RETURNING code, name, description', [name, description, code])
        if (results.rows.length === 0) {
            throw new ExpressError(`Can't update company with code of ${code}`, 404)
        }
        return res.send({ company: results.rows[0] })
    } catch (e) {
        return next(e)
    }
})

router.delete('/:code', async (req, res, next) => {
    try {
        const { code } = req.params;
        const findCompany = await db.query('SELECT * FROM companies WHERE code = $1', [code])
        if (findCompany.rows.length === 0) {
            throw new ExpressError(`Can't find a company with code of ${code}`, 404)
        }
        const results = db.query('DELETE FROM companies WHERE code = $1', [code])
        return res.send({ msg: "DELETED!" })
    } catch (e) {
        return next(e)
    }
})

module.exports = router;