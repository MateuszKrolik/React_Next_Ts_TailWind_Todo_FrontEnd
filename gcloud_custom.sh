#!/bin/bash

source .env

gcloud iam service-accounts create "build-${APP_ACRONYM_LOWERCASE}-dev-sa" \
  --description="Service account for build process in ${APP_FULL_NAME} development environment" \
  --display-name="Build ${APP_ACRONYM_UPPERCASE} Dev SA" \
  --project=$GCLOUD_ID

SA_EMAIL="build-${APP_ACRONYM_LOWERCASE}-dev-sa@${GCLOUD_ID}.iam.gserviceaccount.com"

gcloud projects add-iam-policy-binding $GCLOUD_ID \
  --member="serviceAccount:$SA_EMAIL" \
  --role="roles/artifactregistry.writer"

gcloud projects add-iam-policy-binding $GCLOUD_ID \
  --member="serviceAccount:$SA_EMAIL" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding $GCLOUD_ID \
  --member="serviceAccount:$SA_EMAIL" \
  --role="roles/iam.serviceAccountUser"

gcloud projects add-iam-policy-binding $GCLOUD_ID \
  --member="serviceAccount:$SA_EMAIL" \
  --role="roles/secretmanager.secretAccessor"

gcloud projects add-iam-policy-binding $GCLOUD_ID \
  --member="serviceAccount:$SA_EMAIL" \
  --role="roles/cloudbuild.builds.editor"

gcloud projects add-iam-policy-binding $GCLOUD_ID \
  --member="serviceAccount:$SA_EMAIL" \
  --role="roles/logging.admin"

gcloud projects add-iam-policy-binding $GCLOUD_ID \
  --member="serviceAccount:$SA_EMAIL" \
  --role="roles/firebasehosting.admin"

gcloud projects get-iam-policy $GCLOUD_ID \
  --flatten="bindings[].members" \
  --format='table(bindings.role)' \
  --filter="bindings.members:$SA_EMAIL"

# ROLE
# roles/artifactregistry.writer
# roles/cloudbuild.builds.editor
# roles/iam.serviceAccountUser
# roles/logging.admin
# roles/logging.logWriter
# roles/run.admin
# roles/secretmanager.secretAccessor
# roles/firebasehosting.admin

# To avoid CloudBuild Error - "Permission denied on secret":


gcloud projects add-iam-policy-binding $GCLOUD_ID \
  --member="serviceAccount:$GCLOUD_PROJECT_NUMBER-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"

gcloud projects get-iam-policy $GCLOUD_ID \
  --flatten="bindings[].members" \
  --format='table(bindings.role)' \
  --filter="bindings.members:$GCLOUD_PROJECT_NUMBER-compute@developer.gserviceaccount.com"

# ROLE
# roles/editor
# roles/secretmanager.secretAccessor