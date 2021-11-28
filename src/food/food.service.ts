import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Foodinfo, PostFoodDto, PostFoodWithImageDto, UpdateFoodDto, UpdateFoodWithImageDto } from './dto/food.dto';
import { Model } from 'mongoose';
import { Mode } from 'fs';
import { Predict } from './utility/GTM';
@Injectable()
export class FoodService {

    constructor(@InjectModel('food') private readonly foodModel:Model<Foodinfo> ){}

    async getAllFoods():Promise<Foodinfo[]>{
        let all= await this.foodModel.find({})
        return all;
    }

    getFood(foodId: string){
        return `get food: ${foodId}`;
    }

    postFood(
        food:PostFoodDto
    ) {
        return `post food ${JSON.stringify(food)}`;
    }

    postFoodWithImage(
        food:PostFoodWithImageDto
    ) {

        
        return `post food with image ${JSON.stringify(food)}`;
    }


    updateFood(
        foodId: string,
        food:UpdateFoodDto
    ){
        return `update food ${foodId} with ${JSON.stringify(food)}`;
    }

    async getFoodInfoWithImage(image){
       let obj=await  Predict(image)
       console.log(obj)
       // return `update food with image id ${foodId} with ${JSON.stringify(food)}`;
    }

    deleteFood(
        foodId: string,
    ){
        return `delete food id ${foodId}`;
    }
}
