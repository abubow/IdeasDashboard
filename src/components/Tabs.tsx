import { useState } from 'react';
import styled from 'styled-components';

import "../styles/tabs.css"


interface Props {
    data:{
    id : string,
    tabTitle: string,
    }[]
}

const Tabs = (props : Props) => {
  
    const [visibleTab, setVisibleTab] = useState(props.data[0].id);

    const TabsContent = [
        (
            <div className="tab">
                <h1 style={{ fontSize: "2rem", fontWeight: 500, marginBottom: "1.5rem" }}>
                    Titles are very important
                </h1>
                <div style={{ fontSize: "1rem", fontWeight: 100, marginBottom: "1.5rem",lineHeight: "1.5rem", textAlign: "justify", padding: "0 1rem" }}>
                    Suspendisse molestie urna tortor, nec luctus sem porta et. Suspendisse tempor est dui, at interdum urna sagittis ac. Ut eleifend vestibulum ligula quis efficitur. Vivamus neque velit, porttitor ut bibendum vel, condimentum a libero. Nulla ut arcu arcu. Cras posuere tellus mollis metus faucibus, a suscipit arcu porttitor. Sed imperdiet nibh ac nibh faucibus, eget feugiat ipsum ornare. Maecenas volutpat commodo justo at varius. Aenean pretium congue lorem, vel condimentum nibh ultricies quis. Etiam id lorem enim. Quisque felis felis, molestie mollis massa pretium, ornare lobortis diam. Vestibulum congue mollis ipsum, at placerat tortor dictum nec. Vestibulum quam massa, fringilla et lorem in, convallis ullamcorper felis.

                    Ut facilisis lacus ut tempor rhoncus. Proin massa urna, congue quis purus sed, faucibus tempor lectus. Quisque non fringilla turpis. Sed tincidunt nulla lectus, vitae dapibus ex posuere eget. Nam sit amet ipsum sed leo ullamcorper aliquam sit amet vitae enim. Morbi tristique ex sit amet nisi commodo, et porttitor tellus tempus. Duis diam neque, rutrum ut arcu in, posuere volutpat nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquam ligula at dolor posuere, vitae eleifend ipsum posuere. Aliquam ac diam augue. Nullam ex nisl, volutpat in eros in, consectetur convallis mauris. Etiam euismod hendrerit aliquam. Nulla sit amet ornare tellus.

                    Curabitur consequat libero id velit sagittis, quis efficitur elit scelerisque. Vivamus est lorem, tristique id interdum eu, hendrerit a mi. Etiam iaculis arcu et mauris lacinia pulvinar. Cras ac laoreet justo, at mollis augue. Duis tristique metus ut commodo sodales. Donec id efficitur urna, ut porta purus. In quis semper est, ornare egestas odio. Nam a nunc in felis malesuada dictum vel ut risus. Aliquam nulla orci, viverra a rutrum quis, tincidunt quis nulla.

                    Integer sagittis magna in ex accumsan, a facilisis neque fringilla. Aliquam id nisi volutpat, tempus tellus placerat, ultrices orci. Integer auctor erat eget orci cursus rhoncus. Nulla tincidunt non enim et varius. Phasellus convallis cursus semper. Integer pharetra magna a viverra pretium. Nam dictum viverra imperdiet. Cras tempus quam vel tristique molestie. Nullam convallis augue vel mollis interdum. Fusce ac nisi vitae ex pretium mollis eget sagittis arcu.
                </div>
            </div>
        ),
        (
            <div className="tab">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates dicta tempora voluptas! Omnis magni eligendi voluptatem veniam sequi iusto mollitia, tenetur eaque ullam aperiam natus repudiandae non ipsa reiciendis laborum, et amet ratione dolores sint ea unde optio fuga earum! Enim, quidem alias facilis ab deserunt ullam ad recusandae veniam consequatur, culpa repellendus neque possimus distinctio quia illum fuga molestiae. Ea, similique officia. Expedita porro ipsa ab rem mollitia, odit, saepe explicabo neque quo in sunt voluptatem a, tempore quos modi! Error ad deserunt, dolores veniam, labore velit voluptatem ipsam temporibus sint culpa laborum tenetur, mollitia est sequi expedita. Quia?
            </div>
        ),
        (
            <div className="tab tabs3">
                sahdfkljashf sdfsadf asd fsadfasadfsdfsdfs
            </div>
        )
    ]
  
    const listTitles = props.data.map((item, index) => 
        <li onClick={() => setVisibleTab(item.id)} className={visibleTab === item.id ? "tab-title tab-title--active" : "tab-title"}>{item.tabTitle}</li>
    );
                                     
    const listContent = props.data.map((item, index) =>
        <div style={visibleTab === item.id ? {} : {display: 'none'}} key={index}>
            {TabsContent[parseInt(item.id)-1]}
        </div>
    );
    
    return(
        <div className="tabs">
          <ul className="tabs-titles">
            {listTitles}
          </ul>
          <div className="tab-content">
             {listContent}
          </div>
        </div>
      )
  }

export default Tabs