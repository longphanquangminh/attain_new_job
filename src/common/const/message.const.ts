export const Message = {
  LOGIN: {
    SUCCESS: 'Login successful',
    FAIL: 'Login failed',
    PW_FAIL: 'Incorrect password',
    EMAIL_FAIL: 'Incorrect email',
  },
  REGISTER: {
    SUCCESS: 'Registration successful',
    FAIL: 'Registration failed',
    EMAIL_FAIL: 'Email already exists',
  },
  COMMENT: {
    LIST_ALL: 'List of comments',
    SUCCESS: 'Comment added successfully',
  },
  IMAGE: {
    LIST_ALL: 'List of all images',
    LIST_SEARCH: 'List of searched images',
    LIST_UPLOAD: 'List of user-uploaded images',
    LIST_SAVE: 'List of saved images',
    DETAIL: 'Image details',
    SAVED: 'Saved',
    UNSAVED: 'Unsaved',
    NOTSAVED: 'Not saved',
    DELETE_FAIL_INVALID: 'Deletion failed, image not found',
    DELETE_FAIL_UNAUTHORIZED:
      'User does not have permission to delete this image',
    DELETE_SUCESS: 'Deletion successful',
    UPLOAD_SUCCESS: 'Image upload successful',
    NOT_FOUND: 'Image not found',
  },
  USER: {
    SUCCESS: 'Successfully retrieved user information',
    NOT_FOUND: 'User not found',
    UPDATE_INFO_SUCCESS: 'Successfully updated account information',
    UPDATE_PASSWORD_SUCCESS: 'Password change successful',
    UPDATE_PASSWORD_FAIL_INCORRECT:
      'Password change failed, incorrect current password',
    UPDATE_AVATAR_SUCCESS: 'Successfully changed avatar',
  },
};
