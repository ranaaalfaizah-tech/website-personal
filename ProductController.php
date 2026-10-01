<?php
namespace App\Http\Controllers;
use App\Models\Product;
use Illuminate\Http\Request;
class ProductController extends Controller
{
    public function index(){ return response()->json(['data'=>Product::where('is_active',true)->latest()->get()]); }
    public function store(Request $request){$data=$request->validate(['name'=>'required|string|max:255','size'=>'nullable|string|max:100','description'=>'nullable|string','image'=>'nullable|string','price'=>'nullable|numeric','is_active'=>'boolean']);return response()->json(['data'=>Product::create($data)],201);}
    public function show(Product $product){return response()->json(['data'=>$product]);}
    public function update(Request $request, Product $product){$data=$request->validate(['name'=>'sometimes|required|string|max:255','size'=>'nullable|string|max:100','description'=>'nullable|string','image'=>'nullable|string','price'=>'nullable|numeric','is_active'=>'boolean']);$product->update($data);return response()->json(['data'=>$product]);}
    public function destroy(Product $product){$product->delete();return response()->noContent();}
}
