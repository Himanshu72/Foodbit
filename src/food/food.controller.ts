import {Body, Get, Post, Param, Controller, Put, Delete, UseInterceptors, UploadedFile, Ip} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
        FileInterceptor('image'),
    )
    
   async  getFoodInfoWithImage(
        @UploadedFile() file,
        @Ip() Ip
    ) {

        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        
        let Image=`http://${Ip}/${response.filename}`;
        return await this.foodService.getFoodInfoWithImage(Image);
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
