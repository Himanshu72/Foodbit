import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { foodSchema } from './schemas/schema.food';

@Module({
  imports: [MulterModule.register({
    dest: './public',
  }),
  MongooseModule.forFeature([{name:"food",schema:foodSchema}])
],
  providers: [FoodService],
  controllers: [FoodController],
})
export class FoodModule {}
