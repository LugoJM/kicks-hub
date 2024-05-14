<br />
<div align="center">
  <img src="images/logo.png" alt="Logo" width="80" height="80">
  <h3 align="center">KicksHub</h3>
  <p align="center">
    An awesome website to shop sneakers!
    <br />
    <a href="https://kicks-hub.vercel.app/">Go to Website</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#deployment">Deployment</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>

## About The Project

[![Kicks Hub Website][kicks-hub-screenshot]](https://kicks-hub.vercel.app/)

Welcome to my e-commerce shoe app!
> [!NOTE]
> While the functionality is fully operational, please be aware that no actual sales transactions will occur. Feel free to browse and interact with the app's features at your leisure!


### Built With

Some of the frameworks/libraries used to build this project:

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![PostgreSQL][PostgreSQL]][PostgreSQL-url]
* [![TailwindCSS][TailwindCSS]][TailwindCSS-url]
* [![Prisma][Prisma]][Prisma-url]
* [![Zod][Zod]][Zod-url]
* [![React-hook-form][React-hook-form]][React-hook-form-url]

### Deployment
This project is currently deploy to 2 service clouds:
1. On [Vercel](https://kicks-hub.vercel.app/)
    - All of the CI/CD pipelines are managed by Vercel's workflow.
2. On [AWS](http://ec2-18-118-133-62.us-east-2.compute.amazonaws.com:3000/)
    - The website is deployed usign a **EC2** instance.
      - Docker is installed to manage the applicacion versions and deployment.
      - A **self-hosted-runner** service is running on the instance, configured to trigger application deployment once the build has finished.
        > You can check the pipelines in `cicd.yml`

Both of these deployments are using an **S3 Bucket** to store an retrieve the images displayed on the website.

> *The decision to deploy the project to AWS was made with the intention of honing skills in utilizing AWS services effectively. By deploying the project to AWS, I aimed to gain practical experience with various AWS services, such as EC2 instances, Docker, and S3 buckets. This hands-on practice allows for a deeper understanding of AWS infrastructure and deployment methodologies, enhancing proficiency in cloud-based development and operations.*

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

To get a local copy up and running follow these simple steps.

### Installation
1. Clone the repository
2. Create a copy of the ```.env.template``` and rename it to ```.env``` and then change the enviroment variables as needed.
3. Install all dependencies ```npm instal```
4. Run the local database container ```docker compose up -d```
5. Apply of the prisma migrations ```npx prisma migrate dev```
6. Run the seed file to popule the database ```npm run seed```
7. Run the project ```npm run dev```

> [!TIP]
> If you want to sign-in you can use one of the accounts from `seed.ts`

## Usage
If you're visiting the website this could be helpful.
> [!CAUTION]
> Important advisory: For your security, we strongly advise against using any real personal or financial information while exploring the website. While the functionality is operational, no real sales transactions will take place.
- If you want to sign-in use these credentials:
```Email: user@kicks-hub.com```
```Password: Safe_password1!```
- If you want to place an order you will be asked to pay with paypal. You can use these credentials to complete the payment.
```Email: kicks-hub-buyer@personal.example.com```
```Password: 1234!ABC```
> [!NOTE]  
> The paypal service being use is just the PayPal sandbox provided for testing purposes.

<!-- MARKDOWN LINKS & IMAGES -->
[kicks-hub-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-black?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-black?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[PostgreSQL]: https://img.shields.io/badge/PostgresSQL-black?style=for-the-badge&logo=postgresql&logoColor=61DAFB
[PostgreSQL-url]: https://www.postgresql.org/
[TailwindCSS]: https://img.shields.io/badge/TailwindCSS-black?style=for-the-badge&logo=tailwindcss&logoColor=%2306B6D4
[TailwindCSS-url]: https://tailwindcss.com/
[Prisma]: https://img.shields.io/badge/Prisma-black?style=for-the-badge&logo=prisma&logoColor=%232D3748
[Prisma-url]: https://www.prisma.io/
[Zod]: https://img.shields.io/badge/Zod-black?style=for-the-badge&logo=zod&logoColor=%233E67B1
[Zod-url]: https://zod.dev/
[React-hook-form]: https://img.shields.io/badge/React%20Hook%20Form-black?style=for-the-badge&logo=reacthookform&logoColor=%23EC5990
[React-hook-form-url]: https://react-hook-form.com/
