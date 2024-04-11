import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/modules/prisma/prisma.service";

@Injectable()
export class UseCustomValidator {
    constructor(private readonly prismaService: PrismaService) { }

    async unique(unqies: { table: string, column: string, message?: string, value: any }[] | { table: string, column: string, message?: string, value: any }) {
        try {
            if (Array.isArray(unqies)) {
                for (const entry of unqies) {
                    await this.checkUniqueness(entry);
                }
            } else {
                await this.checkUniqueness(unqies);
            }
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    private async checkUniqueness(data: { table: string, column: string, message?: string, value: any }) {
        const record = await this.prismaService[data.table].findFirst({ where: { [data.column]: data.value } });
        if (record) {
            throw new BadRequestException(data.message ?? { message: `Уже есть такое значение ${data.value}` });
        }
    }
}
