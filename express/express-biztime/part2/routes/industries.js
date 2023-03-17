const express = require("express");
const ExpressError = require("../expressError")
const slugify = require("slugify");
const router = express.Router();
const db = require("../db");

router.get('/', async (req, res, next) => {
    try {
        const results = await db.query(`
        SELECT code, industry, company_code FROM industries 
        JOIN companies_industries 
        ON industries.code = companies_industries.industry_code`);
        return res.json({ industries: results.rows })
    } catch (e) {
        return next(e);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { industry } = req.body;
        const code = slugify(industry, {lower: true});
        const results = await db.query('INSERT INTO industries (code, industry) VALUES ($1, $2) RETURNING code, industry', [code, industry]);
        return res.status(201).json({ industry: results.rows[0] })
    } catch (e) {
        return next(e)
    }
})

module.exports = router;