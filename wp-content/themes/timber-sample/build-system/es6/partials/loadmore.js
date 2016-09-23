import maquette from 'maquette'
import reqwest from 'reqwest'
import moment from 'moment'
const h = maquette.h
const projector = maquette.createProjector()

let PAGE = 2;

let LoadMore = {
  dom: {
    loadMore: document.querySelector('.js-load-more'),
    contentGrid: document.querySelector('.js-c-grid'),
  },
  state: {
    url: window.location.origin
  },
  init() {
    if (this.dom.loadMore) {
      this.handleLoadMore(this.dom.loadMore);
    }
  },

  handleLoadMore(button) {
    let self = this,
      grid = this.dom.contentGrid;

    button.addEventListener('click', (e) => {
      e.preventDefault();

      /*
      /  Use reqwest as an alternative to relying on jQuery
      /  $.ajax functionality 
      */

      reqwest({
        type: 'application/json',
        url: '../api/get_posts/?post_type=post&count=10&page='+PAGE,
        complete: function(data) {

          let cData = JSON.parse(data.response);
          let queriedPosts = cData.posts;

          /*
          /  Increment our global PAGE attribute if there are more pages,
          /  otherwise remove the loadMore button from the page
          */

          let totalPages = cData.pages;
          if (PAGE < totalPages) {
            PAGE += 1;
          } else {
            self.dom.loadMore.parentNode.removeChild(self.dom.loadMore);
          }

          /*
          /  Use Maquette to build the same structure used in our
          /  tease-news.twig file
          */

          Array.from(queriedPosts, (post) => {
            let formattedDate = moment(post.date).format('M d Y');

            let lData = () => {
              return h('article.tease tease-post', {id: post.id}, [
                h('div', [
                  h('img.tease--news-image', {src: post.thumbnail_images.full.url}).
                  h('span.tease--date', formattedDate)
                ]),
                h('div.tease--text-content', [
                  h('h5', {innerHTML: post.title}),
                  h('div.tease--text-content', post.content)
                ])
              ])
            }
            projector.append(grid, lData);
            window.history.pushState({}, "", self.state.url + '/page/' + PAGE)
          })
        }
      })
    })
  }
}

export default LoadMore;
