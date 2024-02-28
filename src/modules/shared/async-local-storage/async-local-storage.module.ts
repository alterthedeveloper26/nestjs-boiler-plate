import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { CORRELATION_ID_HEADER } from '~common/constants/system';
import { v4 } from 'uuid';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        // NOTE: This enable us to get correlation id by using clsService.getId()
        idGenerator: (req: Request) => {
          const reqId = req.headers[CORRELATION_ID_HEADER] as string;

          if (!reqId) {
            const newRequestId = v4();
            req.headers[CORRELATION_ID_HEADER] = newRequestId;
            return newRequestId;
          }

          return reqId;
        }
      }
    })
  ]
})
export class AsyncLocalStorageModule {}
