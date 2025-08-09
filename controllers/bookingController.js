import Category from "../models/category.js";
import { isAdminValid } from "./userControllers.js";

//----------------------------Add new Category-------------------------
export function createCategory(req, res){
    if(req.body.user == null){
        res.status(401).json({
            message: "Unauthorized"
        })
        return
    }
    if(req.body.user.type != "Admin"){
        res.status(403).json({
            message: "Forbidden"
        })
        return
    }
    const newCategory = new Category(req.body)
    newCategory.save().then(
        (result)=>{
            res.json({
                message: "Category created succesfully",
                result: result
            })
        }
    ).catch(
        (err)=>{
            res.json({
                message: "Category creation failed",
                error: err
            })
        }
    )
}

//------------------------------Delete Category--------------------------------
export function deleteCategory(req, res){
    if(req.body.user == null){
        res.status(401).json({
            message: "Unauthorized"
        })
        return
    }
    if(req.body.user.type != "Admin"){
        res.status(403).json({
            message: "Forbidden"
        })
        return
    }
    const name = req.params.name
    Category.findOneAndDelete({name: name}).then(
        ()=>{
            res.json({
                message: "Category Deleted Successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message: "Category Deletion Failed"
            })
        }
    )
}

//---------------------------Show All Categories------------------------------
export function getCategory(req, res){
    Category.find().then(
        (result)=>{
            res.json({
                categories: result
            })
        }
    ).catch(
        ()=>{
            res.json({
                message: "Failed to get Categories"
            })
        }
    )
}

//---------------Get Category Details by it's Name--------------------
export function getCategoryByName(req, res){
    const name = req.params.name
    Category.findOne({name: name}).then(
        (result)=>{
            if(result == null){
                res.json({
                    message: "Category not found"
                })
            }else{
                res.json({
                    category: result
                })
            }
        }
    ).catch(
        ()=>{
            res.json({
                message: "Failed to get Category"
            })
        }
    )
}

//------------------------Update Category------------------------------
export function updateCategory(req, res){
    if(!isAdminValid(req)){
        res.status(403).json({
            message: "Unauthorized"
        })
        return
    }
    const name = req.params.name
    Category.updateOne({name: name},req.body).then(
        ()=>{
            res.json({
                message: "Category Updated Successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                massage: "Failed to Update Category"
            })
        }
    )
}