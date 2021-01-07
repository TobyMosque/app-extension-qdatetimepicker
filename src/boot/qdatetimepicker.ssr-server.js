export default ({ app, ssrContext }) => {
  ssrContext.rendered = () => {
    ssrContext.qdtpScript = `<script>window.__QDTP_DEFAULTS__=${JSON.stringify(app.qdtp)}</script>`
  }
}