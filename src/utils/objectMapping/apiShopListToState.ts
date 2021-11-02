import { FlowerShopPreviewCardProps } from '../../components/FlowerShopPreviewCard/FlowerShopPreviewCard';

export default function apiShopListToState(object: any) {
  const result: FlowerShopPreviewCardProps = {
    name: object.shopName,
    address: object.fullAddress,
    imagePath:
      'https://www.kreator-kwiatow.pl/sklep/blog/wp-content/uploads/2017/10/IMG_20171005_143816_HDR-1024x768.jpg',
    rating: object.rating,
    hasShipping: true,
    reviewCount: object.commentCount,
  };
  return result;
}