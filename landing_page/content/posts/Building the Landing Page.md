---
title: "Building the Landing Page"
date: 2022-06-23T20:33:55+10:00
draft: false
toc: false
images:
tags:
  - AWS
  - CloudFront
  - Lambda
  - S3
  - Route 53
  - GitHub
  - Hugo
  - Build
  - IAM
---

There are many ways to implement static websites, when looking from a project perspective prioritising low cost and scalability I've preferred hosting directly on a CDN for a number of reasons:
1. You don't need to directly manage the redundancy and scalability of containers or compute instances across multiple availability zones.
2. When there is low traffic to the webpage it's very cheap.
3. Rollouts can be simple invalidations on the CDN.

#### I've implemented a static site on AWS using the following services:
1. CloudFront
2. Lambda
3. S3
4. Route 53
5. GitHub
6. Hugo
7. IAM

#### How does it all work together?
Route 53 manages the domain name DNS record to forward requests to the CloudFront distribution.

CloudFront is the CDN that the static web files are served on, it uses Lambda@Edge to append the "/index.html" to requests when required, for example "/posts/Building the Landing Page/index.html".

CloudFront also gets the files to serve from an S3 bucket.

Hugo is used as a static site generator tool to create the public files that end up being uploaded to the S3 bucket and served on CloudFront. Hugo also has a local webserver for testing changes before commiting them.

GitHub is used to store and maintain the source code and also uses GitHub Actions to implement the CI/CD pipeline; this allows the S3 bucket to automatically receive the updated files on a GitHub push and the CloudFront distribution gets invalidated automatically deploying the new files.

Meanwhile, IAM is the security mechanism allowing access between the different AWS services internally and the GitLab Actions CI/CD.

![Overview Diagram](/img/overview_diagram.png)