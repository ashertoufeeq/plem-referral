import {
  Divider,
  Menu,
  Popconfirm,
  Button,
  Drawer,
  Popover,
  Tooltip,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";

import { RenderSubTitle, RenderTitle } from "components/TextRenderer";
import { IDrawerActions, IDrawerProps } from "interfaces/entity/drawer";

const TableDrawerHoc = ({
  isOpen,
  toggle,
  currentRecord,
  drawerProps,
}: {
  isOpen: boolean;
  toggle: () => void;
  currentRecord?: any;
  drawerProps: IDrawerProps;
}) => {
  const {
    Render: DrawerBody,
    actions: drawerActions,
  } = drawerProps;

  return (
    <>
      {drawerProps && DrawerBody && isOpen ? (
        <Drawer
          width={drawerProps?.width || 800}
          onClose={toggle}
          open={isOpen}
          styles={{ body: { padding: 0 } }}
          closable={false}
        >
          <div
            className="px-4 pt-3"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <RenderTitle
                level={4}
                style={{ margin: 0, padding: 0 }}
                title={drawerProps?.title || "Details"}
                props={currentRecord}
              />
            </div>
            <div className="">
              <Button
                type="text"
                icon={<CloseOutlined />}
                style={{ border: "none" }}
                onClick={(e) => {
                  toggle();
                  e.stopPropagation();
                }}
              />
            </div>
          </div>
          <div className="px-4 pt-1 pb-3 d-flex flex-row align-items-center justify-content-between">
            <RenderSubTitle
              subTitle={drawerProps?.subTitle}
              props={currentRecord}
            />
          </div>
          <Divider style={{ margin: 0, padding: 0 }} />
          <div
            className="table-hoc-drawer-menu"
            style={{
              backgroundColor: "#f5f5f5",
              justifyContent: "space-between",
              display: "flex",
            }}
          >
            <Menu
              mode="horizontal"
              className="px-4"
              style={{
                backgroundColor: "#f5f5f5",
                margin: 0,
                padding: 0,
                width: "100%",
              }}
            >
              {(drawerActions || []).map(
                (
                  { Component: ActionComponent, ...action }: IDrawerActions,
                  ind: number
                ) => (
                  <Menu.Item
                    key={"action" + action.label + ind}
                    style={{ padding: 0 }}
                    disabled={
                      typeof action.disabled === "function"
                        ? action.disabled(currentRecord)
                        : action.disabled
                    }
                  >
                    {ActionComponent ? (
                      <ActionComponent row={currentRecord} />
                    ) : action?.confirmTitle ? (
                      <Popconfirm
                        disabled={
                          typeof action.disabled === "function"
                            ? action.disabled(currentRecord)
                            : action.disabled
                        }
                        style={{ margin: 0 }}
                        title={
                          typeof action?.confirmTitle === "function"
                            ? action?.confirmTitle(currentRecord)
                            : action?.confirmTitle
                        }
                        {...(typeof action?.confirmProps === "function"
                          ? action?.confirmProps(currentRecord)
                          : action?.confirmProps || {})}
                        onConfirm={() => {
                          return action?.onClick
                            ? action.onClick(currentRecord, toggle)
                            : undefined;
                        }}
                        onCancel={(e: any) => e.stopPropagation()}
                      >
                        <Tooltip
                          title={
                            action.tooltipLabel ||
                            (typeof action.label === "function"
                              ? action.label(currentRecord)
                              : action.label)
                          }
                        >
                          <Button
                            disabled={
                              typeof action.disabled === "function"
                                ? action.disabled(currentRecord)
                                : action.disabled
                            }
                            type="text"
                            onClick={(e) => e.stopPropagation()}
                            icon={action.iconButton}
                            {...(typeof action.buttonProps === "function"
                              ? action.buttonProps(currentRecord)
                              : action?.buttonProps)}
                          >
                            {typeof action.label === "function"
                              ? action.label(currentRecord)
                              : action.label}
                          </Button>
                        </Tooltip>
                      </Popconfirm>
                    ) : action?.Render ? (
                      <>
                        <Popover
                          content={() => (
                            <>
                              {action?.Render
                                ? (action as any)?.Render(currentRecord)
                                : null}
                              {!action.hidePopoverFooter ? (
                                <div>
                                  <div className="row align-center justify-end">
                                    <Button
                                      type="primary"
                                      size="small"
                                      onClick={() => {
                                        return action?.onClick
                                          ? action.onClick(
                                              currentRecord,
                                              toggle
                                            )
                                          : undefined;
                                      }}
                                    >
                                      Submit
                                    </Button>
                                  </div>
                                </div>
                              ) : null}
                            </>
                          )}
                          title={
                            typeof action.popoverTitle === "function"
                              ? action.popoverTitle(currentRecord)
                              : action.popoverTitle
                          }
                          trigger="click"
                        >
                          <Tooltip
                            title={
                              action.tooltipLabel ||
                              (typeof action.label === "function"
                                ? action.label(currentRecord)
                                : action.label)
                            }
                          >
                            <Button
                              disabled={
                                typeof action.disabled === "function"
                                  ? action.disabled(currentRecord)
                                  : action.disabled
                              }
                              type="text"
                              icon={action.iconButton}
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              {...(typeof action.buttonProps === "function"
                                ? action.buttonProps(currentRecord)
                                : action.buttonProps)}
                            >
                              {action?.label}
                            </Button>
                          </Tooltip>
                        </Popover>
                      </>
                    ) : (
                      <Tooltip
                        title={
                          action.tooltipLabel ||
                          (typeof action.label === "function"
                            ? action.label(currentRecord)
                            : action.label)
                        }
                      >
                        <Button
                          disabled={
                            typeof action.disabled === "function"
                              ? action.disabled(currentRecord)
                              : action.disabled
                          }
                          style={{ margin: 0 }}
                          type="text"
                          onClick={(e) => {
                            e.stopPropagation();
                            return action?.onClick
                              ? action.onClick(currentRecord, toggle)
                              : undefined;
                          }}
                          icon={action.iconButton}
                          {...(typeof action.buttonProps === "function"
                            ? action.buttonProps(currentRecord)
                            : action?.buttonProps)}
                        >
                          {typeof action.label === "function"
                            ? action.label(currentRecord)
                            : action.label}
                        </Button>
                      </Tooltip>
                    )}
                  </Menu.Item>
                )
              )}
            </Menu>
            {(drawerProps?.extraActions || []).length > 0 && (
              <Menu
                mode="horizontal"
                className="px-4"
                style={{ backgroundColor: "#f5f5f5", margin: 0, padding: 0 }}
              >
                {(drawerProps?.extraActions || []).map(
                  ({ Compnent: ActionComponent, ...action }: any, ind) => (
                    <Menu.Item
                      key={"action" + action.label + ind}
                      style={{ padding: 0 }}
                      disabled={
                        typeof action.disabled === "function"
                          ? action.disabled(currentRecord)
                          : action.disabled
                      }
                    >
                      {ActionComponent ? (
                        <ActionComponent row={currentRecord} />
                      ) : action?.confirmTitle ? (
                        <Popconfirm
                          disabled={
                            typeof action.disabled === "function"
                              ? action.disabled(currentRecord)
                              : action.disabled
                          }
                          style={{ margin: 0 }}
                          title={
                            typeof action?.confirmTitle === "function"
                              ? action?.confirmTitle(currentRecord)
                              : action?.confirmTitle
                          }
                          {...(typeof action?.confirmProps === "function"
                            ? action?.confirmProps(currentRecord)
                            : action?.confirmProps || {})}
                          onConfirm={() => {
                            if (action?.onClick) {
                              return action?.onClick(currentRecord, toggle);
                            }
                          }}
                          onCancel={(e: any) => e.stopPropagation()}
                        >
                          <Tooltip
                            title={
                              action.tooltipLabel ||
                              (typeof action.label === "function"
                                ? action.label(currentRecord)
                                : action.label)
                            }
                          >
                            <Button
                              disabled={
                                typeof action.disabled === "function"
                                  ? action.disabled(currentRecord)
                                  : action.disabled
                              }
                              type="text"
                              onClick={(e) => e.stopPropagation()}
                              icon={action.iconButton}
                              {...(typeof action.buttonProps === "function"
                                ? action.buttonProps(currentRecord)
                                : action?.buttonProps)}
                            >
                              {typeof action.label === "function"
                                ? action.label(currentRecord)
                                : action.label}
                            </Button>
                          </Tooltip>
                        </Popconfirm>
                      ) : (
                        <Tooltip
                          title={
                            action.tooltipLabel ||
                            (typeof action.label === "function"
                              ? action.label(currentRecord)
                              : action.label)
                          }
                        >
                          <Button
                            disabled={
                              typeof action.disabled === "function"
                                ? action.disabled(currentRecord)
                                : action.disabled
                            }
                            style={{ margin: 0 }}
                            type="text"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (action?.onClick) {
                                return action?.onClick(currentRecord, toggle);
                              }
                            }}
                            icon={action.iconButton}
                            {...(typeof action.buttonProps === "function"
                              ? action.buttonProps(currentRecord)
                              : action?.buttonProps)}
                          >
                            {typeof action.label === "function"
                              ? action.label(currentRecord)
                              : action.label}
                          </Button>
                        </Tooltip>
                      )}
                    </Menu.Item>
                  )
                )}
              </Menu>
            )}
          </div>

          <div className="px-3" style={{ height: "100%" }}>
            <div className="mt-3 mb-1">
              {drawerProps?.extraBody
                ? drawerProps?.extraBody(currentRecord)
                : null}
            </div>
            <div>
              {currentRecord ? DrawerBody(currentRecord) : null}
            </div>
          </div>
        </Drawer>
      ) : null}
    </>
  );
};

export default TableDrawerHoc;
