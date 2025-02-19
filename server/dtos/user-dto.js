export default class UserDto {
  id;
  email;
  role;

  constructor(id, email, role) {
    this.id = id;
    this.email = email;
    this.role = role;
  }
}
