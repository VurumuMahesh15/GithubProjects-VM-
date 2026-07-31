resource "local_file" "deployment_record" {
  filename = "${path.module}/deployment-record.txt"
  content  = <<-EOF
    Deployment Record
    ------------------
    Managed by: Terraform
    Purpose: Infrastructure validation placeholder
  EOF
}