import { ArgumentMetadata, ConflictException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "./expections/validation";



@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToClass(metadata.metatype, value);
        const errors = await validate(obj);
        
        if (errors.length) {
            let res = errors.map(item => {
                let { property, constraints } = item
                let message = Object.values(constraints)
                return { property, message }
            })

            throw new ValidationException(res)
        }
        return value;
    }
}