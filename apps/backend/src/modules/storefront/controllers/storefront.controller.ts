import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import * as storefrontService from "../services/storefront.service";
import { storageService } from "../../../lib/storage";

const formatProductUrls = (product: any) => {
  if (product && product.images && Array.isArray(product.images)) {
    product.images = product.images.map((img: string) =>
      img.startsWith("http") ? img : storageService.getFileUrl(img),
    );
  }
  return product;
};

export const getCreatorStorefront = asyncHandler(
  async (req: Request, res: Response) => {
    const { username } = req.params;
    const creator = await storefrontService.getCreatorByUsername(username as string);

    // Format URLs for creator avatar and their products
    if (creator.image && !creator.image.startsWith("http")) {
      creator.image = storageService.getFileUrl(creator.image);
    }
    creator.products = creator.products.map(formatProductUrls);

    res.json(creator);
  },
);

export const getMarketplaceFeed = asyncHandler(
  async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const result = await storefrontService.getPublishedProducts(page, limit);
    result.data = result.data.map((product: any) => {
      const p = formatProductUrls(product);
      if (p.seller?.image && !p.seller.image.startsWith("http")) {
        p.seller.image = storageService.getFileUrl(p.seller.image);
      }
      return p;
    });

    res.json(result);
  },
);

export const getProductDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await storefrontService.getPublishedProductById(id as string);

    const formattedProduct = formatProductUrls(product);
    if (formattedProduct.seller?.image && !formattedProduct.seller.image.startsWith("http")) {
      formattedProduct.seller.image = storageService.getFileUrl(formattedProduct.seller.image);
    }

    res.json(formattedProduct);
  },
);
