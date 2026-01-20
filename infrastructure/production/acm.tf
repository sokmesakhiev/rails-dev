module "ssl_certificate" {
  source = "../modules/ssl_certificate"

  domain_name               = var.short_website_url
  subject_alternative_names = ["*.rails-dev.com"]
  route53_zone              = data.aws_route53_zone.this

  providers = {
    aws = aws.us-east-1
  }
}
