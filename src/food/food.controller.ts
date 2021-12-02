import {Body, Get, Post, Param, Controller, Put, Delete, UseInterceptors, UploadedFile, Ip} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {PostFoodDto, PostFoodWithImageDto,Foodinfo ,UpdateFoodDto, UpdateFoodWithImageDto } from './dto/food.dto';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {
    constructor(private readonly foodService:FoodService) {}
    @Get()
    getAllFoods(
    ) {
        return this.foodService.getAllFoods();
    }

    @Get('/:foodId')
    getFood(
        @Param('foodId') foodId: string
    ) {
        return this.foodService.getFood(foodId);
    }

    @Post()
    postFood(
        @Body() body:PostFoodDto
    ) {
        return this.foodService.postFood(body);
    }

    @Post('/image')
    @UseInterceptors(
        FileInterceptor('image',{storage: diskStorage({
            // Specify where to save the file
            destination: (req, file, cb) => {
              cb(null, 'public');
            },
            // Specify the file name
            filename: (req, file, cb) => {
              cb(null, Date.now() +".jpg");
            },
          })}),
    )
    
   async  getFoodInfoWithImage(
        @UploadedFile() file,
        @Ip() Ip
    ) {

        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        
        console.log(response)
       
    return await this.foodService.getFoodInfoWithImage(response.filename);
    }

    @Put('/:foodId')
    updateFood(
        @Param('foodId') foodId: string,
        @Body() food:UpdateFoodDto
    ){
        return this.foodService.updateFood(foodId,food);
    }

    @Put('/:foodId/image')
    updateFoodWithImage(
        @Param('foodId') foodId: string,
        @Body() food:UpdateFoodWithImageDto
    ){
        ///return this.foodService.updateFoodWithImage(foodId,food);
    }

    @Delete('/:foodId')
    deleteFood(
        @Param('foodId') foodId: string,
    ){
        return this.foodService.deleteFood(foodId);
    }
}
