import {useState, useEffect} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface List {
  category: string
  items: Slide[]
}

interface Slide {
  year: string
  text: string
}

function History(props: { data: List[] }) {

  const { data } = props
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState(data[current].items);
  const [firstDate, setFirstDate] = useState(slides[0].year);
  const [lastDate, setLastDate] = useState(slides[slides.length - 1].year);
  const dataCount = data.length;

  const handleChangeData = (num: number): void => {
    setSlides(data[num].items);
    setCurrent(num);
  }

  useEffect(() => {
    setFirstDate(slides[0].year);
    setLastDate(slides[slides.length - 1].year);
  }, [slides])

  return (
    <section className="history">
      <h1 className="history__title">Исторические даты</h1>

      <div className="history__current">
        <div className="history__current_date start">{firstDate}</div>
        <div className="history__current_date end">{lastDate}</div>
      </div>

      <div className="history__tabs">
        {data.map((item, index) => {
          let rotate = 360 / dataCount * (index - current) - 15 * dataCount + 30;
          let rotateReverse = rotate * -1;
          return (
            <div
              key={index}
              className={`history__tabs_item ${current === index ? ' active' : ''}`}
              style={{transform: 'rotate(' + rotate + 'deg) translate(265px) rotate(' + rotateReverse + 'deg)'}}
              onClick={() => handleChangeData(index)}
            >
              <div className="history__tabs_item_num">{index + 1}</div>
                <div className="history__tabs_item_text">{item.category}</div>
              </div>
            )
        })}
      </div>

      <div className="history__slider">
        <div className="history__nav">
          <div className="history__nav_col">
            <div className="history__count">{current + 1}/{dataCount}</div>
            <div className="history__arrows">
              <button className="history__arrows_item prev" onClick={() => handleChangeData(current - 1)} disabled={current === 0 ? true : false}></button>
              <button className="history__arrows_item next" onClick={() => handleChangeData(current + 1)} disabled={current === dataCount - 1 ? true : false}></button>
            </div>
          </div>
          <div className="history__pagination">
            {data.map((item, index) => (
              <div key={index} className={`history__pagination_item ${current === index ? ' active' : ''}`} onClick={() => handleChangeData(index)}></div>
            ))}
          </div>
        </div>
        
        <div className="history__slider_wrapper">
        {slides ?
          <Swiper
            spaceBetween={25}
            slidesPerView={1.5}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 40
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 80
              }
            }}
          >
            {slides.map((slide: Slide, index) => (
                <SwiperSlide key={index} className="history__slide">
                  <div className="history__slide_year">{slide.year}</div>
                  <div className="history__slide_text">{slide.text}</div>
                </SwiperSlide>
              ))}
          </Swiper> : null
        }
        </div>
      </div>

    </section>
  );
}

export default History;