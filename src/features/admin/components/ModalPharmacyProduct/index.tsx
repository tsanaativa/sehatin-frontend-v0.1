import { Modal } from '@/components/common';
import { PharmacyProduct } from '@/types/Pharmacy';
import { Category, Product } from '@/types/Product';
import Image from 'next/image';

type ModalPharmacyProduct = {
  onShowModal: (showModal: boolean) => void;
  showModal: boolean;
  data: PharmacyProduct[];
  id: number;
};

const ModalPharmacyProduct = ({
  onShowModal,
  showModal,
  data,
  id,
}: ModalPharmacyProduct) => {
  const detailProduct = data.find((d) => d.id === id);

  return (
    <Modal onClick={() => onShowModal(false)} showModal={showModal}>
      <div className="flex justify-between gap-x-6 p-6">
        <div>
          <Image
            src={detailProduct?.product.product_picture as string}
            className="object-cover"
            width={300}
            height={90}
            alt=""
          />
        </div>
        <div className="w-full flex flex-col gap-y-6">
          <div className="flex justify-between">
            <span className="font-semibold text-base text-dark-gray">Name</span>
            <span className="text-base text-dark w-3/5">
              {detailProduct?.product.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-base text-dark-gray">
              Selling Unit
            </span>
            <span className="text-base text-dark w-3/5">
              {detailProduct?.product.selling_unit}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-base text-dark-gray">
              Category
            </span>
            <div className="flex flex-col text-base text-dark w-3/5">
              {detailProduct?.product.categories?.map((cat, idx) => (
                <span key={idx}>{cat.name}</span>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-base text-dark-gray">
              Description
            </span>
            <span className="text-base text-dark w-3/5">
              {detailProduct?.product.description}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-base text-dark-gray">
              Content
            </span>
            <span className="text-base text-dark w-3/5">
              {detailProduct?.product.content}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-base text-dark-gray">
              Classification
            </span>
            <span className="text-base text-dark w-3/5">
              {detailProduct?.product.classification}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-base text-dark-gray">
              Product Form
            </span>
            <span className="text-base text-dark w-3/5">
              {detailProduct?.product.form}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-base text-dark-gray">
              Weight
            </span>
            <span className="text-base text-dark w-3/5">
              {detailProduct?.product.weight}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-base text-dark-gray">
              Dimension (l x w x h)
            </span>
            <span className="text-base text-dark w-3/5">
              {`${detailProduct?.product.length} cm x ${detailProduct?.product.width} cm x ${detailProduct?.product.height} cm`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-base text-dark-gray">
              Manufacture
            </span>
            <span className="text-base text-dark w-3/5">
              {detailProduct?.product.manufacture}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalPharmacyProduct;
