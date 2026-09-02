import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Edit3, Package, DollarSign, Activity, TrendingUp } from "lucide-react";
import { useProductDetailsPage } from "../../features/dashboard/hooks/useProductDetailsPage";
import { ProductOrdersList } from "../../features/products/components/ProductOrdersList";
import { ProductReviewsPlaceholder } from "../../features/products/components/ProductReviewsPlaceholder";
import { Button } from "@/components/ui/button";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'orders' | 'reviews'>('orders');
  const { product, details, isLoading, isError } = useProductDetailsPage(id as string);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto animate-pulse space-y-8">
        <div className="h-40 bg-gray-200 rounded-xl w-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-32 bg-gray-200 rounded-xl" />
          <div className="h-32 bg-gray-200 rounded-xl" />
          <div className="h-32 bg-gray-200 rounded-xl" />
        </div>
        <div className="h-96 bg-gray-200 rounded-xl w-full" />
      </div>
    );
  }

  if (isError || !product || !details) {
    return (
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-gray-500 mb-6">We couldn't find the details for this product.</p>
        <Button asChild>
          <Link to="/dashboard/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <Link 
            to="/dashboard/products" 
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to Products
          </Link>
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden shrink-0">
              {product.images[0] ? (
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Package className="size-6" />
                </div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="font-semibold text-gray-900">${(product.price / 100).toFixed(2)}</span>
                <span className="text-gray-300">•</span>
                <span className="text-sm font-medium text-gray-500">
                  Status: <span className={product.status === 'PUBLISHED' ? 'text-green-600 font-bold' : 'text-gray-600 font-bold'}>{product.status}</span>
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-sm font-medium text-gray-500">
                  Stock: <span className="text-gray-900 font-bold">{product.stock} units</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <Button asChild variant="outline" className="border-gray-200 shadow-sm self-start md:self-center">
          <Link to={`/dashboard/products/${product.id}/edit`}>
            <Edit3 className="mr-2 size-4" />
            Edit Product
          </Link>
        </Button>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-gray-700">Total Units Sold</p>
            <div className="text-[#FF3333]">
              <Package className="size-5" />
            </div>
          </div>
          <div className="flex items-end gap-3 mb-1">
            <p className="text-3xl font-bold text-gray-900 leading-none">{details.totalUnitsSold}</p>
            <span className="inline-flex items-center rounded bg-green-50 px-1.5 py-0.5 text-xs font-semibold text-green-700 mb-0.5">
              <TrendingUp className="mr-1 size-3" />
              12.3%
            </span>
          </div>
          <p className="text-xs text-gray-400">vs. last period</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-gray-700">Total Revenue Generated</p>
            <div className="text-[#FF3333]">
              <DollarSign className="size-5" />
            </div>
          </div>
          <div className="flex items-end gap-3 mb-1">
            <p className="text-3xl font-bold text-gray-900 leading-none">${(details.totalRevenue / 100).toFixed(2)}</p>
            <span className="inline-flex items-center rounded bg-green-50 px-1.5 py-0.5 text-xs font-semibold text-green-700 mb-0.5">
              <TrendingUp className="mr-1 size-3" />
              8.4%
            </span>
          </div>
          <p className="text-xs text-gray-400">vs. last period</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-gray-700">Total Orders</p>
            <div className="text-[#FF3333]">
              <Activity className="size-5" />
            </div>
          </div>
          <div className="flex items-end gap-3 mb-1">
            <p className="text-3xl font-bold text-gray-900 leading-none">{details.productOrders.length}</p>
            <span className="inline-flex items-center rounded bg-green-50 px-1.5 py-0.5 text-xs font-semibold text-green-700 mb-0.5">
              <TrendingUp className="mr-1 size-3" />
              15.5%
            </span>
          </div>
          <p className="text-xs text-gray-400">vs. last period</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('orders')}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
              ${activeTab === 'orders'
                ? 'border-[#FF3333] text-[#FF3333]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            Orders
            <span className={`ml-3 rounded-full py-0.5 px-2.5 text-xs font-medium inline-block
              ${activeTab === 'orders' ? 'bg-red-100 text-[#FF3333]' : 'bg-gray-100 text-gray-900'}
            `}>
              {details.productOrders.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
              ${activeTab === 'reviews'
                ? 'border-[#FF3333] text-[#FF3333]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            Reviews & Ratings
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="pt-6">
        {activeTab === 'orders' ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Orders Containing this Product</h2>
            </div>
            <ProductOrdersList orders={details.productOrders} productName={product.name} />
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <ProductReviewsPlaceholder />
          </div>
        )}
      </div>
    </div>
  );
}
