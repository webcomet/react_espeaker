import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addGround } from 'redux/modules/data';

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addGround,
}, dispatch)

export default (container) => connect(
  mapStateToProps,
  mapDispatchToProps
)(container)
