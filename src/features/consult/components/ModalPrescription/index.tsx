import { Button, Input, Modal } from '@/components/common';
import { getProducts } from '@/services/product';
import { PaginationInfo } from '@/types/PaginationInfo';
import { Product, ProductsParams } from '@/types/Product';
import { formatBirthDateToAge } from '@/utils/formatter';
import { Plus, Trash2, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { createPrescription } from '../../actions/consultation';

type ModalPrescriptionProps = {
  onShowModal: (showModal: boolean) => void;
  showModal: boolean;
  notify: (url: string) => void;
  patientBirthDate: string;
};

const ModalPrescription = ({
  onShowModal,
  showModal,
  notify,
  patientBirthDate,
}: ModalPrescriptionProps) => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [items, setItems] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<number[]>([]);

  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>();
  const [searchParams, setSearchParams] = useState<ProductsParams>({
    limit: 9,
    page: 1,
    keyword: '',
  });
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const fetchProducts = async (searchParams: ProductsParams) => {
    try {
      if (searchParams.page > 1) {
        setIsLoadingMore(true);
      }

      const res = await getProducts(searchParams);
      setPaginationInfo(res.pagination_info);

      if (searchParams.page > 1) {
        setProducts((prev) => [...prev, ...res.products]);
      } else {
        setProducts(res.products);
      }
    } catch (err) {
      toast.error((err as Error).message);
    }

    setIsLoadingMore(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = (e.target as HTMLInputElement).value;
    if (keyword !== '') {
      const newParams = {
        ...searchParams,
        page: 1,
        keyword: keyword,
      };
      setSearchParams(newParams);
      fetchProducts(newParams);
    } else {
      setProducts([]);
    }
  };

  const loadMore = async () => {
    const newParams = {
      ...searchParams,
      page: searchParams.page + 1,
    };
    setSearchParams(newParams);
    fetchProducts(newParams);
  };

  const [idIdxMap, setIdIdxMap] = useState(new Map<number, number>());

  const handleAddItem = (product: Product) => {
    const foundIdx = idIdxMap.get(product.id);
    if (foundIdx !== undefined) {
      const prevQuantity = quantities[foundIdx];
      setQuantities((prev) => [
        ...prev.slice(0, foundIdx),
        prevQuantity + 1,
        ...prev.slice(foundIdx + 1),
      ]);
    } else {
      const idx = items.length;
      setIdIdxMap(new Map(idIdxMap.set(product.id, idx)));
      setItems((prev) => [...prev, product]);
      setQuantities((prev) => [...prev, 1]);
    }
  };

  const handleDeleteItem = (product: Product, idx: number) => {
    setQuantities((prev) => [...prev.slice(0, idx), ...prev.slice(idx + 1)]);
    setItems((prev) => [...prev.slice(0, idx), ...prev.slice(idx + 1)]);
    const newMap = new Map(idIdxMap);
    newMap.delete(product.id);
    setIdIdxMap(new Map(newMap));
  };

  const handleSubmit = async () => {
    const productIds = items.map((item) => item.id);

    const prescReq = {
      products: productIds,
      quantities: quantities,
      patient_age: formatBirthDateToAge(patientBirthDate),
    };

    setIsLoading(true);
    try {
      const prescUrl = await createPrescription(prescReq, `${id}`);
      notify(prescUrl.prescription_url);
      onShowModal(false);
    } catch (error) {
      toast.error((error as Error).message);
    }
    setIsLoading(false);
  };

  return (
    <Modal onClick={() => onShowModal(false)} showModal={showModal}>
      <div className="flex items-center justify-between border-b border-gray-light font-poppins font-semibold text-sm px-4 py-4 md:text-lg">
        Prescribe Medicine{' '}
        <X
          className="text-gray cursor-pointer"
          onClick={() => onShowModal(false)}
        />
      </div>
      <div className="flex flex-col gap-y-2 px-5 pb-5 md:min-w-[500px]">
        <div>
          <form
            action={handleSubmit}
            className="text-start flex flex-col pt-5 gap-4 [&>label]:flex [&>label]:flex-col [&>label]:gap-1 [&_h5]:text-[14px] [&_h5]:text-dark-gray [&_h5]:leading-[150%]"
          >
            <Input
              prepend="Search"
              placeholder="Search medicines..."
              onChange={handleSearch}
            />
            <div className="grid grid-cols-3 gap-2">
              {products.map((product, idx) => (
                <div
                  key={idx}
                  className="p-2 border border-gray-light rounded flex justify-between items-center"
                >
                  <span className="line-clamp-1">{product.name}</span>
                  <Button
                    type="button"
                    className="px-2"
                    onClick={() => handleAddItem(product)}
                  >
                    <Plus size={15} />
                  </Button>
                </div>
              ))}
            </div>
            {paginationInfo && products.length < paginationInfo?.total_data && (
              <div className="flex w-full justify-center">
                <Button
                  type="button"
                  className="w-full md:max-w-[150px] flex justify-center text-sm"
                  variant="outlined-primary"
                  onClick={loadMore}
                  loading={isLoadingMore}
                >
                  Load More
                </Button>
              </div>
            )}
            <div className="border border-gray-light rounded p-2">
              <div className="flex justify-between w-full mb-1">
                <label className="w-[60%] text-sm text-dark-gray">
                  Product Name
                </label>
                <label className="w-[30%] text-sm text-dark-gray">
                  Quantity
                </label>
                <label className="min-w-16 text-sm text-dark-gray">
                  <span className="invisible">Button</span>
                </label>
              </div>
              <div>
                {items.length > 0 ? (
                  <>
                    {items.map((item, idx) => (
                      <div key={idx} className="flex justify-between w-full">
                        <div className="w-[60%]">{item.name}</div>
                        <div className="w-[30%] text-nowrap">
                          {quantities[idx]} Per {item.selling_unit}
                        </div>
                        <div className="min-w-16 flex justify-end">
                          <button
                            type="button"
                            className="text-gray"
                            onClick={() => handleDeleteItem(item, idx)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="flex justify-center items-center text-gray py-4 text-sm">
                    No medicines yet
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-5 items-center mb-2">
              <Button
                className="text-sm flex items-center py-3 justify-center gap-1 px-6 mt-3 w-full min-h-[44px] md:min-w-[150px] md:w-fit"
                onClick={handleSubmit}
                loading={isLoading}
                disabled={items.length === 0}
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ModalPrescription;
