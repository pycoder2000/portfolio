const items = [
  {
    jobTitle: 'Data Engineer Intern',
    company: 'Glassdoor',
    companyUrl: 'https://glassdoor.com',
    startDate: '2024-05-28',
    location: 'San Francisco, California',
    description: [
      'Developed Kafka connectors to faciliate data transfer from S3 to Kafka to Snowflake.',
      'Skills: Apache Kafka · Confluent Kafka',
    ],
  },
  {
    jobTitle: 'Data Engineer Research Assistant',
    company: 'San Francisco State University',
    companyUrl: 'https://www.sfsu.edu/index.html',
    startDate: '2023-09-06',
    endDate: '2024-03-15',
    location: 'San Francisco, California',
    description: [
      'Migrated Python scripts to Spark, cutting app processing times by 40%, and boosting performance and operational efficiency.',
      'Automated Algolia search index creation for drug data, achieving sub-100ms search result delivery, enhancing user experience.',
      'Implemented an OpenAI-powered chatbot trained on FDA drug data for the app, offering safe drug suggestions to users, thereby improving customer engagement.',
      'Skills: Amazon DynamoDB · Algolia · Amazon S3 · Apache Spark · Data Preparation',
    ],
  },
  {
    jobTitle: 'Graduate Assistant',
    company: 'San Francisco State University',
    companyUrl: 'https://www.sfsu.edu/index.html',
    startDate: '2023-09-25',
    endDate: '2024-05-30',
    location: 'San Francisco, California',
    description: [
      'Streamlined Qualtrics survey data processing, employing advanced cleaning and transformation techniques, enhancing data quality by 30%, and accelerating analysis readiness.',
      'Generated actionable insights from survey data through efficient analytics and reporting, increasing data-driven decisions.',
      'Skills: Qualtrics · Microsoft Excel',
    ],
  },
  {
    jobTitle: 'Data Engineer',
    company: 'Accenture Strategy & Consulting',
    companyUrl: 'https://www.accenture.com/us-en/about/consulting-index',
    startDate: '2022-07-01',
    endDate: '2023-07-21',
    location: 'Gujarat, India',
    description: [
      'Spearheaded the migration of 39 AWS-backed Tableau Dashboards to GCP, requiring complex SQL query replication, enhancing dashboard performance by 30% and cutting operational costs by 25%.',
      'Developed Python scripts for RDS and Redshift migrations, cutting DB update time by 98.33% through efficient SQL generation.',
      'Designed and implemented distributed computing solutions using Apache Spark and EKS, optimizing data processing workflows.',
      'Led a 3-person team to develop a user-friendly web application that automates the generation of Python Airflow DAGs, enhancing workflow automation.',
      'Engineered and deployed a robust solution on EKS using Helm for executing CRUD operations on DAGs across diverse environments such as on-premise, Amazon MWAA, and Google Cloud Composer, streamlining deployment processes.',
      'Skills: AWS Identity and Access Management (AWS IAM) · Amazon Elastic MapReduce (EMR) · Amazon S3 · Azure Data Factory · Java · Apache Kafka · Python · Apache Spark · SQL · Google Cloud Platform (GCP) · Amazon Web Services (AWS) · Scala · Apache Airflow · Data Engineering · Data Analytics',
    ],
  },
  {
    jobTitle: 'Data Engineer Intern',
    company: 'Accenture Strategy & Consulting',
    companyUrl: 'https://www.accenture.com/us-en/about/consulting-index',
    startDate: '2022-01-07',
    endDate: '2022-06-21',
    location: 'Gujarat, India',
    description: [
      'Developed AWS Lambda functions and integrated with SNS Queue, reducing manual tasks, and cutting migration time, enhancing overall efficiency by 40%.',
      'Crafted an Encryption & Hashing module utilizing Scala and Spark for our ETL platform which bolstered data security in transit.',
      'Automated ETL pipelines for clients, aligning with key KPIs, which enhanced data accuracy and workflow efficiency, leading to a 20% increase in client satisfaction.',
      'Skills: Python · Scala · Apache Spark',
    ],
  },
  {
    jobTitle: 'Data Science Intern',
    company: 'HOPS Healthcare',
    companyUrl: 'https://hops.healthcare/',
    startDate: '2021-03-01',
    endDate: '2021-06-30',
    location: 'Gujarat, India',
    description: [
      'Developed a pipeline for extracting critical healthcare information from informal patient-doctor conversations.',
      'Led the launch of a Django-based web application, for secure analysis and storage of patient reports, improving data security and access efficiency by 40%.',
      'Played a pivotal role in the MongoDB database design & architecture during the initial phase, establishing foundational models.',
      'Engineered a Bio-BERT and Regex-powered parsing bot, to automate key data extraction from reports.',
      'Skills: Leadership · Python · Regex · Django · SQL · NLP · BERT Language Model',
    ],
  },
]

export default items
