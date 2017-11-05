


















































bool Document::ValidateAndSerialize(Handle* output_handle) {
  ValidationResult validation_result = validator_->Validate(&contents_);
  if (validation_result == ValidationResult::Failure) {
    return false;
  }
  return serializer_->Serialize(&contents_);
}
