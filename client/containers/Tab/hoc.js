import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setEvent, updateOption, saveData, saveOthernote } from 'redux/modules/data';

const mapStateToProps = ({ data, user }) => ({
  data,
  user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setEvent,
  updateOption,
  saveData,
  saveOthernote,
}, dispatch)

export default (container) => connect(
  mapStateToProps,
  mapDispatchToProps
)(container)
