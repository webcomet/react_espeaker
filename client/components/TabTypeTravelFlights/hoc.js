import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addFlight } from 'redux/modules/data';

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addFlight,
}, dispatch)

export default (container) => connect(
  mapStateToProps,
  mapDispatchToProps
)(container)
