import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slice/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { list } from '../components/Sort';



const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage } = useSelector(state => state.filter);
  const sortType = sort.sortProperty;

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = number => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = () => {
    setIsLoading(true);

    axios
      .get(
        `https://6879125563f24f1fdca0babc.mockapi.io/pizzas?page=${currentPage}&limit=5`
      )
      .then((res) => {
        console.log('Пиццы с API:', res.data);
        setItems(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Ошибка при загрузке пицц:', err);
        setItems([]);
        setIsLoading(false);
      });
  }

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find(obj => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);


  React.useEffect(() => {

    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;


  }, [categoryId, sortType, searchValue, currentPage,]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage])




  const filteredItems = React.useMemo(() => {
    const filtered = categoryId === 0
      ? [...items]
      : items.filter(pizza => pizza.categories && pizza.categories.includes(Number(categoryId)));

    return filtered.sort((a, b) => {
      const sortBy = sortType;
      if (sortBy === 'title') {
        return a[sortBy].localeCompare(b[sortBy]);
      }
      return a[sortBy] - b[sortBy];
    });
  }, [items, categoryId, sortType]);

  const pizzas = filteredItems
    .filter(obj => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((obj) => {
     
      const safeId = obj.id ? String(obj.id) : nanoid();

      return (
        <PizzaBlock
          key={safeId}
          id={safeId}
          {...obj}
        />
      );
    });

  const skeleton = [...new Array(8)].map((_, index) => <Skeleton key={index} />);


  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeleton : pizzas}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
