import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import { marked } from 'marked'
import hljs from "highlight.js";
import { Row, Col, List, Breadcrumb } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import servicePath from '../config/apiUrl'


import { CalendarOutlined, FolderOutlined, FireOutlined } from '@ant-design/icons'

const Home = (list) => {

  const [mylist, setMylist] = useState(list.data);
  const renderer = new marked.Renderer();

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });

  return (
    <>

      <Head>
        <title>Home</title>
      </Head>
      <Header />

      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>列表</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <List
              header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
                    <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span><CalendarOutlined /> {item.addTime}</span>
                    <span><FolderOutlined /> {item.typeName}</span>
                    <span><FireOutlined /> {item.view_count}人</span>
                  </div>
                  <div className="list-context"
                  dangerouslySetInnerHTML={{__html:marked(item.introduce)}}>
                    </div>
                </List.Item>
              )}
            />
          </div>
        </Col>

        <Col className="comm-box" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>

      <Footer />
    </>)
}
Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleList).then(
      (res) => {
        resolve(res.data)
      }
    )
  })

  return await promise
}

export default Home