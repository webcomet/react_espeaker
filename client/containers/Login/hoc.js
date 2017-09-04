import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { setLoginData } from 'redux/modules/user';

const mapStateToProps = () => ({

})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  push,
  setLoginData,
}, dispatch)

export default (container) => connect(
  mapStateToProps,
  mapDispatchToProps
)(container)
