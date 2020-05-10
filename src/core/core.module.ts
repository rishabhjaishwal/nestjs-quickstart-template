import { Module, Global, HttpModule } from '@nestjs/common';
@Global()
@Module({
    imports: [
        HttpModule.register({
            timeout:1000,
            maxRedirects: 5,
        }),
    ],
    providers: [
    ],
    exports: [HttpModule]
})
export class CoreModule {}
