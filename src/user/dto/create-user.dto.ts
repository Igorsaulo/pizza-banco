export class CreateUserDto {
  constructor(
    public nome : string,
    public cpf : string,
    public data_nascimento : string,
  ) {}
}