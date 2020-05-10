import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";

export class UpperCasePipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        // console.log(value,metadata.type)
      
        if(value && metadata.type == 'query') {
            const changed = await value.toUpperCase();
            return changed;
        }
        return undefined;
    }
}