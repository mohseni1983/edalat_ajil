import { ApiProperty } from "@nestjs/swagger";

export class FindProductDto{
    @ApiProperty()
    productName:string
}