variable "aws_region" {
  type        = string
  default     = "us-east-1"
  description = "AWS region"
}


variable "mapbox_token" {
  description = "MAPBOX_TOKEN"
  type = string
}

variable "account_id" {
  description = "Account ID"
  type = string
}