resource "aws_s3_bucket" "naked_redirect" {
  bucket = var.short_website_url
}

resource "aws_s3_bucket_website_configuration" "naked_redirect" {
  bucket = aws_s3_bucket.naked_redirect.id

  redirect_all_requests_to {
    host_name = var.full_website_url
    protocol  = "https"
  }
}

resource "aws_s3_bucket" "website" {
  bucket = var.full_website_url
}

resource "aws_s3_bucket_ownership_controls" "website" {
  bucket = aws_s3_bucket.website.id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

resource "aws_s3_bucket_public_access_block" "website" {
  bucket                  = aws_s3_bucket.website.id
  block_public_acls       = true
  ignore_public_acls      = true
  block_public_policy     = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.website.id

  index_document {
    suffix = "index.html"
  }
}

data "aws_iam_policy_document" "website" {
  statement {
    actions = [
      "s3:GetObject",
    ]

    resources = [
      "${aws_s3_bucket.website.arn}/*",
    ]

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
  }
}

resource "aws_s3_bucket_policy" "website" {
  bucket = aws_s3_bucket.website.id
  policy = data.aws_iam_policy_document.website.json
}
