# Product Overview System Design
A complete backend system design to support the product overview component of an e-commerce retail client, with the ultimate goal of supporting up to 10,000 requests per second.

### Database
Millions of records were imported into a PostgreSQL database using complex joins across multiple tables to serve product, style, and sku data.

### Load Balancer
NGINX and AWS Load Balancer distributed traffic across the servers using a round robin method.

### Server
Servers ran on Node and Express to communication between the load balancer and the database.

### Deployment
10 servers, 1 load balancer, and 1 database were deployed across 12 AWS EC2 micro-instances.

### Engineering Team
The system design behind this component is built by Jim Burch.
See Questions & Answers and Product Reviews to see engineering work by [Emma Knor](https://github.com/async-anonymous/qa-db/tree/2b186e94a19b130de5bf5ad7221f1eae331372e7) and [Dennis Arnold](https://github.com/async-anonymous/reviews-db/tree/fcdfe3d2dc492f59f982acae73a3b99bf4ed1a43).
