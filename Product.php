<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Product extends Model
{
    protected $fillable=['name','size','description','image','price','is_active'];
    protected $casts=['price'=>'decimal:2','is_active'=>'boolean'];
}
