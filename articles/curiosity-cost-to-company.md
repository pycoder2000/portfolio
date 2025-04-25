---
title: How My Curiosity Cost $250,000 to One of India’s Biggest OTT Companies
description: "Lessons from a costly BigQuery mistake during a massive AWS to GCP data migration for an OTT client."
image: /static/images/blog/curiousity-comany-cost.jpg
date: "2025-04-05"
---

You can find the original post on [LinkedIn](https://www.linkedin.com/posts/desaiparth2000_%F0%9D%90%91%F0%9D%90%9E%F0%9D%90%9F%F0%9D%90%A5%F0%9D%90%9E%F0%9D%90%9C%F0%9D%90%AD%F0%9D%90%A2%F0%9D%90%A7%F0%9D%90%A0-%F0%9D%90%A8%F0%9D%90%A7-%F0%9D%90%8C%F0%9D%90%B2-%F0%9D%90%88%F0%9D%90%A7%F0%9D%90%AD%F0%9D%90%9E%F0%9D%90%AB-activity-7296645062988378112-JOsw?utm_source=share&utm_medium=member_desktop&rcm=ACoAACZ4yK8Bx_TwidB567QE5FMTdP29hcwUezc).

# How My Curiosity Cost $250,000 to One of India’s Biggest OTT Companies (and What I Learned)

## Table of Contents
1. [The Context: A High-Stakes Migration](#the-context-a-high-stakes-migration)
2. [Where It Went Wrong](#where-it-went-wrong)
3. [The Financial Impact](#the-financial-impact)
4. [Key Lessons I Learned](#key-lessons-i-learned)
5. [Final Thoughts](#final-thoughts)

## The Context: A High-Stakes Migration

A couple of years ago, while working at Accenture, I was staffed on a major project with one of India’s largest OTT companies. The task? Migrate critical data infrastructure from AWS to GCP. It wasn’t just about moving data — we had to transition 30+ high-priority dashboards used by the C-suite to make strategic decisions.

Key metrics tracked:
- MAV (Monthly Average Viewers)
- MVV (Monthly Video Viewers)
- DAV (Daily Average Viewers)
- DVV (Daily Video Viewers)

These dashboards were originally hosted on AWS SageMaker notebooks and had to be rebuilt in Tableau powered by BigQuery.

## Where It Went Wrong

It was my first time working with data at such a scale — terabytes of data and billions of rows. I was fascinated by BigQuery's performance and began using it as a sandbox.

At the time, BigQuery had limitations like lack of CTE support. I had to consolidate all logic into single monolithic queries.

The architectural mistakes I made:
- Complex joins that unnecessarily scanned large datasets multiple times
- Nested subqueries that caused redundant processing
- Overused `SELECT *`
- No `LIMIT`, which pulled massive volumes of data into memory

## The Financial Impact

After the first month of migration, the BigQuery bill reached ₹20 million (~$250,000). The finance team raised eyebrows. I feared the worst.

Thankfully, the client was understanding — the dashboards were mission-critical, and they had budgeted for operational turbulence. Still, it was a wake-up call.

## Key Lessons I Learned

This project became one of the most formative experiences of my data engineering journey. Here’s what I took away:

### 1. Efficiency Matters
Just because something runs doesn’t mean it’s well-designed. Query performance is paramount.

### 2. Cost Awareness
Cloud compute isn’t free. Understand billing models. Know what costs what.

### 3. Query Optimization
I went deep into learning SQL engine internals and best practices:
- Refactoring subqueries
- Using `EXPLAIN` and query planner tools
- Indexing
- Partitioning and clustering strategies

## Final Thoughts

That costly mistake changed the way I approach large-scale data systems. It sparked my obsession with writing optimized, scalable queries and understanding the nuances of cloud platforms.

If you're working on big data challenges or dealing with tricky SQL problems, feel free to reach out. I’d love to collaborate and learn together.

