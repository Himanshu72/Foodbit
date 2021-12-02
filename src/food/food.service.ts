import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Foodinfo, PostFoodDto, PostFoodWithImageDto, UpdateFoodDto, UpdateFoodWithImageDto } from './dto/food.dto';
import { Model } from 'mongoose';
import { Mode } from 'fs';
import { Predict } from './utility/GTM';
import GlobalUtility from 'src/utility/globalUtility';
@Injectable()
export class FoodService {

    constructor(@InjectModel('food') private readonly foodModel:Model<Foodinfo> ){}

    async getAllFoods():Promise<Foodinfo[]>{
        let all= await this.foodModel.find({})
        return all;
    }

    async getFood(foodId: string):Promise<Foodinfo>{
        let info= await this.foodModel.findOne({_id:foodId})
        return info;
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
       let info=await this.getFood(obj.class);
       GlobalUtility.deletFile(image);
       return info;
    }

    deleteFood(
        foodId: string,
    ){
        return `delete food id ${foodId}`;
    }
}
