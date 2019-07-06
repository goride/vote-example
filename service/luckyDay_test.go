package service
import (
	. "github.com/smartystreets/goconvey/convey"
	"testing"
)

func TestLuckyday(t *testing.T) {
	Convey("basic", t, func() {
		So(LuckyDay().Format("2006-01-02"), ShouldEqual, "1992-12-19")
	})
}