import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addHotel } from 'redux/modules/data';

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addHotel,
}, dispatch)

export default (container) => connect(
  mapStateToProps,
  mapDispatchToProps
)(container)
